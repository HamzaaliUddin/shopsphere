import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
      <div
        aria-hidden
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M3 4h2l2.4 11.1a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.5L22 8H6" />
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold tracking-tight">Your cart is empty</h2>
      <p className="mt-1 max-w-sm text-sm text-muted">
        Browse the latest pieces — apparel, footwear, accessories, and more.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Continue shopping
      </Link>
    </div>
  );
}
