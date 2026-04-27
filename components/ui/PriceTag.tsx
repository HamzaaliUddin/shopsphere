import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: { current: "text-sm font-medium", compare: "text-xs" },
  md: { current: "text-base font-semibold", compare: "text-sm" },
  lg: { current: "text-2xl font-semibold tracking-tight", compare: "text-base" },
} as const;

export function PriceTag({
  price,
  compareAtPrice,
  currency = "USD",
  size = "md",
  className,
}: PriceTagProps) {
  const sizeStyles = SIZES[size];
  const onSale = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={sizeStyles.current}>{formatCurrency(price, currency)}</span>
      {onSale && (
        <span className={cn("text-muted line-through", sizeStyles.compare)}>
          {formatCurrency(compareAtPrice, currency)}
        </span>
      )}
    </span>
  );
}
