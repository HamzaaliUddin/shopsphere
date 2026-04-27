"use client";

import { useState } from "react";
import { QuantityStepper } from "@/components/ui";
import { AddToCartButton } from "./AddToCartButton";
import type { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const max = Math.max(1, Math.min(product.stock, 99));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted">
          Quantity
        </span>
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={max}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <AddToCartButton
          product={product}
          quantity={quantity}
          size="lg"
          fullWidth
          className="sm:flex-1"
        />
      </div>
    </div>
  );
}
