"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { PriceTag, QuantityStepper } from "@/components/ui";
import { formatCurrency } from "@/lib/utils/format";
import type { ResolvedCartItem } from "@/types";

interface CartItemRowProps {
  item: ResolvedCartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { setQuantity, removeItem } = useCart();
  const { product, quantity, lineTotal } = item;
  const cover = product.images[0];

  return (
    <li className="flex gap-4 py-6">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface sm:h-28 sm:w-28"
      >
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 640px) 112px, 96px"
            className="object-cover"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-medium leading-snug">
              <Link href={`/products/${product.id}`} className="hover:underline">
                {product.name}
              </Link>
            </h3>
            <p className="mt-0.5 text-xs capitalize text-muted">{product.category}</p>
          </div>
          <span className="shrink-0 text-sm font-semibold tabular-nums">
            {formatCurrency(lineTotal, product.currency)}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <QuantityStepper
            value={quantity}
            onChange={(q) => setQuantity(product.id, q)}
            min={1}
            max={Math.max(1, Math.min(product.stock, 99))}
            size="sm"
          />
          <div className="flex items-center gap-3 text-xs text-muted">
            <PriceTag price={product.price} currency={product.currency} size="sm" />
            <button
              type="button"
              onClick={() => removeItem(product.id)}
              className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
