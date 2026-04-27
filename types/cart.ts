import type { Product } from "./product";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ResolvedCartItem {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}
