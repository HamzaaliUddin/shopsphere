import { Container } from "@/components/layout";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import { Skeleton } from "@/components/ui";

export default function ProductsLoading() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-10 max-w-2xl">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-3 h-9 w-64" />
        <Skeleton className="mt-3 h-4 w-80" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    </Container>
  );
}
