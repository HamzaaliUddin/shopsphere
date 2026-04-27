"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { CartItem, CartTotals, Product, ResolvedCartItem } from "@/types";
import { products as catalog } from "@/lib/data/products";

const STORAGE_KEY = "shopsphere.cart.v1";
const SHIPPING_THRESHOLD = 75;
const SHIPPING_FEE = 8;
const TAX_RATE = 0.08;

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "setQuantity"; productId: string; quantity: number }
  | { type: "clear" };

interface CartState {
  items: CartItem[];
  hydrated: boolean;
}

const initialState: CartState = { items: [], hydrated: false };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items, hydrated: true };
    case "add": {
      const existing = state.items.find((i) => i.productId === action.productId);
      const items = existing
        ? state.items.map((i) =>
            i.productId === action.productId
              ? { ...i, quantity: i.quantity + action.quantity }
              : i,
          )
        : [...state.items, { productId: action.productId, quantity: action.quantity }];
      return { ...state, items };
    }
    case "remove":
      return { ...state, items: state.items.filter((i) => i.productId !== action.productId) };
    case "setQuantity": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.productId !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity: action.quantity } : i,
        ),
      };
    }
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export interface CartContextValue {
  items: CartItem[];
  resolved: ResolvedCartItem[];
  totals: CartTotals;
  hydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  isInCart: (productId: string) => boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (i): i is CartItem =>
          typeof i === "object" &&
          i !== null &&
          typeof (i as CartItem).productId === "string" &&
          typeof (i as CartItem).quantity === "number",
      )
      .map((i) => ({ productId: i.productId, quantity: Math.max(1, Math.floor(i.quantity)) }));
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* quota or disabled — silent */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const hydratedRef = useRef(false);

  useEffect(() => {
    dispatch({ type: "hydrate", items: readStorage() });
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    writeStorage(state.items);
  }, [state.items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "add", productId: product.id, quantity });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "remove", productId });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "setQuantity", productId, quantity });
  }, []);

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(() => {
    const resolved: ResolvedCartItem[] = state.items
      .map((item) => {
        const product = catalog.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter((x): x is ResolvedCartItem => x !== null);

    const subtotal = resolved.reduce((sum, r) => sum + r.lineTotal, 0);
    const itemCount = resolved.reduce((sum, r) => sum + r.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const total = subtotal + shipping + tax;

    const totals: CartTotals = { subtotal, shipping, tax, total, itemCount };
    const isInCart = (productId: string) =>
      state.items.some((i) => i.productId === productId);

    return {
      items: state.items,
      resolved,
      totals,
      hydrated: state.hydrated,
      addItem,
      removeItem,
      setQuantity,
      clear,
      isInCart,
    };
  }, [state, addItem, removeItem, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const CART_CONFIG = {
  shippingThreshold: SHIPPING_THRESHOLD,
  shippingFee: SHIPPING_FEE,
  taxRate: TAX_RATE,
} as const;
