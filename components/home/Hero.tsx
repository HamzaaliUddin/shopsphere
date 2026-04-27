import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout";
import { Badge } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-6">
          <Badge tone="accent" className="mb-5">New season · 2026</Badge>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Considered objects
            <br />
            for everyday life.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            A small, carefully chosen edit of apparel, footwear, accessories, and
            home goods. Built to last, designed to be loved.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Shop the collection
            </Link>
            <Link
              href="/products?sort=newest"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-background"
            >
              What&apos;s new
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-background">
              <Image
                src="https://picsum.photos/seed/hero-a/700/900"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl bg-background sm:mt-12">
              <Image
                src="https://picsum.photos/seed/hero-b/700/900"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
