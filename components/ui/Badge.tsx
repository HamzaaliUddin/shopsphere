import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeTone = "neutral" | "accent" | "success" | "warning";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-surface text-foreground border border-border",
  accent: "bg-accent text-accent-foreground",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900",
  warning: "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
};

export function Badge({ tone = "neutral", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium tracking-tight",
        TONES[tone],
        className,
      )}
      {...rest}
    />
  );
}
