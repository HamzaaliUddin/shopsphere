import type { CategoryId } from "./product";

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "newest";

export interface ProductFilters {
  categories: CategoryId[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort: SortOption;
}
