import Link from "next/link";
import { Container } from "@/components/layout";
import { ProductGrid } from "@/components/product";
import { getFeaturedProducts } from "@/lib/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts(8);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Featured
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Best of the season
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} priorityCount={4} />
      </Container>
    </section>
  );
}
