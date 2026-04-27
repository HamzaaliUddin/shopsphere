"use client";

import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils/format";
import { CART_CONFIG } from "@/lib/context/CartContext";
import type { CartTotals } from "@/types";

interface CartSummaryProps {
  totals: CartTotals;
}

export function CartSummary({ totals }: CartSummaryProps) {
  const remainingForFreeShipping = Math.max(
    0,
    CART_CONFIG.shippingThreshold - totals.subtotal,
  );
  const showShippingNudge = remainingForFreeShipping > 0 && totals.itemCount > 0;

  return (
    <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-base font-semibold tracking-tight">Order summary</h2>

      <dl className="mt-5 flex flex-col gap-3 text-sm">
        <Row label={`Subtotal (${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"})`}>
          {formatCurrency(totals.subtotal)}
        </Row>
        <Row label="Shipping">
          {totals.shipping === 0 ? (
            <span className="text-emerald-600 dark:text-emerald-400">Free</span>
          ) : (
            formatCurrency(totals.shipping)
          )}
        </Row>
        <Row label="Estimated tax">{formatCurrency(totals.tax)}</Row>
      </dl>

      {showShippingNudge && (
        <p className="mt-4 rounded-md bg-background px-3 py-2 text-xs text-muted">
          Add {formatCurrency(remainingForFreeShipping)} more for free shipping.
        </p>
      )}

      <div className="my-5 h-px bg-border" />

      <div className="flex items-baseline justify-between text-base font-semibold">
        <span>Total</span>
        <span className="tabular-nums">{formatCurrency(totals.total)}</span>
      </div>

      <Button size="lg" fullWidth className="mt-6">
        Checkout
      </Button>
      <p className="mt-3 text-center text-xs text-muted">
        Demo only — checkout is not enabled.
      </p>
    </aside>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="tabular-nums">{children}</dd>
    </div>
  );
}
