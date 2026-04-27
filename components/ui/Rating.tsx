import { cn } from "@/lib/utils/cn";

interface RatingProps {
  value: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({
  value,
  reviewCount,
  showCount = true,
  size = "sm",
  className,
}: RatingProps) {
  const clamped = Math.max(0, Math.min(5, value));
  const percent = (clamped / 5) * 100;
  const starSize = size === "md" ? "text-base" : "text-sm";

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div
        className={cn("relative inline-block leading-none", starSize)}
        aria-label={`Rated ${clamped.toFixed(1)} out of 5`}
      >
        <span className="text-border">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden text-amber-500"
          style={{ width: `${percent}%` }}
          aria-hidden
        >
          ★★★★★
        </span>
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-muted">
          {clamped.toFixed(1)} ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
