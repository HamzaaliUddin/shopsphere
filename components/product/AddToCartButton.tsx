"use client";

import { useState, useTransition } from "react";
import { useCart } from "@/hooks/useCart";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const outOfStock = product.stock <= 0;

  const handleClick = () => {
    if (outOfStock) return;
    startTransition(() => {
      addItem(product, quantity);
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1400);
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      onClick={handleClick}
      disabled={outOfStock}
      isLoading={isPending}
      aria-live="polite"
    >
      {outOfStock ? "Out of stock" : justAdded ? "Added ✓" : "Add to cart"}
    </Button>
  );
}
