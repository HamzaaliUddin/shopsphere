import { Container } from "@/components/layout";
import { Skeleton } from "@/components/ui";

export default function ProductDetailLoading() {
  return (
    <Container className="py-8 sm:py-12">
      <Skeleton className="mb-8 h-3 w-64" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-6 h-12 w-full rounded-lg" />
        </div>
      </div>
    </Container>
  );
}
