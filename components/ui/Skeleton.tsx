import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Skeleton({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn("skeleton-shimmer rounded-md", className)}
      {...rest}
    />
  );
}
