import type { Metadata } from "next";
import { Container } from "@/components/layout";
import { ProductGrid, ProductFiltersUI } from "@/components/product";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { applyFilters, parseFilters } from "@/lib/utils/filter";
import type { CategoryId } from "@/types";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the full ShopSphere catalog with filters and sorting.",
};

const VALID_CATEGORY_IDS: ReadonlyArray<CategoryId> = categories.map((c) => c.id);

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const filters = parseFilters(params, VALID_CATEGORY_IDS);
  const filtered = applyFilters(products, filters);

  const priceBounds = {
    min: Math.floor(Math.min(...products.map((p) => p.price))),
    max: Math.ceil(Math.max(...products.map((p) => p.price))),
  };

  const heading =
    filters.categories.length === 1
      ? (categories.find((c) => c.id === filters.categories[0])?.name ?? "Shop")
      : "Shop all";

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Catalog
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {filtered.length} of {products.length} products. Use filters to narrow your search.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ProductFiltersUI
            categories={categories}
            active={filters}
            priceBounds={priceBounds}
            resultCount={filtered.length}
          />
        </aside>
        <div>
          <ProductGrid products={filtered} priorityCount={4} />
        </div>
      </div>
    </Container>
  );
}
