import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout";
import { Badge, PriceTag, Rating } from "@/components/ui";
import {
  ProductActions,
  ProductGallery,
  ProductGrid,
} from "@/components/product";
import { getCategory } from "@/lib/data/categories";
import {
  getProductById,
  getRelatedProducts,
  products,
} from "@/lib/data/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);
  const onSale =
    product.compareAtPrice !== undefined && product.compareAtPrice > product.price;
  const lowStock = product.stock > 0 && product.stock <= 10;

  return (
    <>
      <Container className="py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/products" className="hover:text-foreground">
                Shop
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden>/</li>
            <li className="truncate text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              {product.isNew && <Badge tone="accent">New</Badge>}
              {onSale && <Badge tone="success">Sale</Badge>}
              {lowStock && <Badge tone="warning">Only {product.stock} left</Badge>}
              {category && (
                <Link
                  href={`/products?category=${category.id}`}
                  className="text-xs font-medium uppercase tracking-widest text-muted underline-offset-4 hover:underline"
                >
                  {category.name}
                </Link>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <PriceTag
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                currency={product.currency}
                size="lg"
              />
              <Rating
                value={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
            </div>

            <p className="mt-6 max-w-prose text-base leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-8">
              <ProductActions product={product} />
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
              <li>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Shipping
                </p>
                <p className="mt-1">Free over $75 · 2–4 business days</p>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Returns
                </p>
                <p className="mt-1">30 days, no questions asked</p>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Tags
                </p>
                <p className="mt-1 capitalize">{product.tags.join(", ")}</p>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Stock
                </p>
                <p className="mt-1">
                  {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-16">
          <Container>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight">
              You may also like
            </h2>
            <ProductGrid products={related} />
          </Container>
        </section>
      )}
    </>
  );
}
