import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout";
import { categories } from "@/lib/data/categories";

const FEATURED_CATEGORY_IDS = ["apparel", "footwear", "accessories", "outdoor"] as const;

export function CategoryShowcase() {
  const featured = FEATURED_CATEGORY_IDS.map((id) =>
    categories.find((c) => c.id === id),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Shop by category
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Browse all →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/products?category=${cat.id}`}
                className="group relative block overflow-hidden rounded-2xl bg-surface"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={`https://picsum.photos/seed/cat-${cat.id}/600/750`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-base font-semibold tracking-tight">{cat.name}</h3>
                  <p className="mt-0.5 text-xs text-white/80">{cat.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
