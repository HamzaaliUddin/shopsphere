"use client";

import { useCart } from "@/hooks/useCart";
import { Skeleton } from "@/components/ui";
import { EmptyCart } from "./EmptyCart";
import { CartItemRow } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartList() {
  const { hydrated, resolved, totals } = useCart();

  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border">
          {Array.from({ length: 2 }).map((_, i) => (
            <li key={i} className="flex gap-4 py-6">
              <Skeleton className="h-28 w-28 shrink-0 rounded-lg" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="mt-auto h-9 w-32 rounded-md" />
              </div>
            </li>
          ))}
        </ul>
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    );
  }

  if (resolved.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <ul className="divide-y divide-border">
        {resolved.map((item) => (
          <CartItemRow key={item.product.id} item={item} />
        ))}
      </ul>
      <CartSummary totals={totals} />
    </div>
  );
}
