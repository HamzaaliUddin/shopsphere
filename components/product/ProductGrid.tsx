import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: ReadonlyArray<Product>;
  priorityCount?: number;
}

export function ProductGrid({ products, priorityCount = 0 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
        <p className="text-base font-medium">No products match your filters.</p>
        <p className="mt-1 text-sm text-muted">Try clearing some filters or widening your price range.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <li key={p.id} className="animate-fade-in-up">
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
