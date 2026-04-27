"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ReadonlyArray<ProductImage>;
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = images[activeIdx] ?? images[0];

  if (!active) return null;

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {images.length > 1 && (
        <ul className="flex shrink-0 gap-3 overflow-x-auto md:flex-col md:overflow-visible">
          {images.map((image, i) => {
            const isActive = i === activeIdx;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Show image ${i + 1} of ${productName}`}
                  aria-current={isActive}
                  className={cn(
                    "relative block aspect-square h-20 w-20 overflow-hidden rounded-lg transition-all",
                    isActive
                      ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                      : "opacity-70 hover:opacity-100",
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-surface">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="animate-fade-in-up object-cover"
        />
      </div>
    </div>
  );
}
