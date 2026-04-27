"use client";

import { cn } from "@/lib/utils/cn";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
  ariaLabel?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
  ariaLabel = "Quantity",
}: QuantityStepperProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  const dim = size === "sm" ? "h-9" : "h-11";
  const btn = size === "sm" ? "h-9 w-9 text-base" : "h-11 w-11 text-lg";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-background",
        dim,
        className,
      )}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-l-lg transition-colors",
          "hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40",
          btn,
        )}
      >
        −
      </button>
      <span
        className={cn(
          "inline-flex min-w-10 items-center justify-center px-2 text-sm font-medium tabular-nums",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-r-lg transition-colors",
          "hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40",
          btn,
        )}
      >
        +
      </button>
    </div>
  );
}
