"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export function CartIndicator() {
  const { totals, hydrated } = useCart();
  const count = hydrated ? totals.itemCount : 0;

  return (
    <Link
      href="/cart"
      aria-label={`Shopping cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="M3 4h2l2.4 11.1a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.5L22 8H6" />
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
      </svg>
      {hydrated && count > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground"
          aria-hidden
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
