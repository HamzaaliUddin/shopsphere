import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:opacity-90 active:opacity-80 disabled:opacity-50",
  secondary:
    "bg-surface text-foreground border border-border hover:bg-border/40 disabled:opacity-50",
  ghost:
    "bg-transparent text-foreground hover:bg-surface disabled:opacity-50",
  outline:
    "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background disabled:opacity-50",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-md gap-1.5",
  md: "h-11 px-5 text-sm rounded-lg gap-2",
  lg: "h-12 px-6 text-base rounded-lg gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    fullWidth,
    isLoading,
    disabled,
    children,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium tracking-tight transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
});
