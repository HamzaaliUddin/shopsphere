import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ className, label, children, type = "button", ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-all",
          "hover:bg-surface hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
