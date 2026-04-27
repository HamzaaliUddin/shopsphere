import Image from "next/image";
import Link from "next/link";
import { Badge, PriceTag, Rating } from "@/components/ui";
import { AddToCartButton } from "./AddToCartButton";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const cover = product.images[0];
  const onSale =
    product.compareAtPrice !== undefined && product.compareAtPrice > product.price;

  return (
    <article className="group flex flex-col">
      <Link
        href={`/products/${product.id}`}
        className="relative block overflow-hidden rounded-2xl bg-surface"
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority={priority}
          />
        </div>
        {(product.isNew || onSale) && (
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && <Badge tone="accent">New</Badge>}
            {onSale && <Badge tone="success">Sale</Badge>}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-medium leading-snug tracking-tight">
            <Link href={`/products/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <PriceTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            currency={product.currency}
            size="sm"
            className="shrink-0"
          />
        </div>
        <Rating value={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto pt-3">
          <AddToCartButton product={product} variant="secondary" size="sm" fullWidth />
        </div>
      </div>
    </article>
  );
}
