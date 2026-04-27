import { Skeleton } from "@/components/ui";

interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="mt-2 h-9 w-full rounded-md" />
        </li>
      ))}
    </ul>
  );
}
