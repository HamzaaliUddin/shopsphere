import type { ProductFilters } from "@/types";

export function buildProductsUrl(filters: Partial<ProductFilters>): string {
  const params = new URLSearchParams();
  if (filters.categories && filters.categories.length > 0) {
    params.set("category", filters.categories.join(","));
  }
  if (filters.minPrice !== undefined) params.set("min", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set("max", String(filters.maxPrice));
  if (filters.search) params.set("q", filters.search);
  if (filters.sort && filters.sort !== "featured") params.set("sort", filters.sort);
  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}
