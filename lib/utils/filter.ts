import type { CategoryId, Product, ProductFilters, SortOption } from "@/types";

const SORT_VALUES: ReadonlyArray<SortOption> = [
  "featured",
  "price-asc",
  "price-desc",
  "rating-desc",
  "newest",
];

export function isSortOption(value: unknown): value is SortOption {
  return typeof value === "string" && (SORT_VALUES as readonly string[]).includes(value);
}

export function parseFilters(
  searchParams: Record<string, string | string[] | undefined>,
  validCategories: ReadonlyArray<CategoryId>,
): ProductFilters {
  const rawCategory = searchParams.category;
  const categoryList = Array.isArray(rawCategory)
    ? rawCategory
    : rawCategory
      ? rawCategory.split(",")
      : [];
  const categories = categoryList.filter((c): c is CategoryId =>
    (validCategories as readonly string[]).includes(c),
  );

  const sortRaw = Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort;
  const sort: SortOption = isSortOption(sortRaw) ? sortRaw : "featured";

  const minPriceRaw = Array.isArray(searchParams.min) ? searchParams.min[0] : searchParams.min;
  const maxPriceRaw = Array.isArray(searchParams.max) ? searchParams.max[0] : searchParams.max;
  const searchRaw = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;

  const minPrice = minPriceRaw && !isNaN(Number(minPriceRaw)) ? Number(minPriceRaw) : undefined;
  const maxPrice = maxPriceRaw && !isNaN(Number(maxPriceRaw)) ? Number(maxPriceRaw) : undefined;

  return {
    categories,
    minPrice,
    maxPrice,
    search: searchRaw?.trim() || undefined,
    sort,
  };
}

export function applyFilters(items: ReadonlyArray<Product>, filters: ProductFilters): Product[] {
  const { categories, minPrice, maxPrice, search, sort } = filters;
  const term = search?.toLowerCase();

  const filtered = items.filter((p) => {
    if (categories.length > 0 && !categories.includes(p.category)) return false;
    if (minPrice !== undefined && p.price < minPrice) return false;
    if (maxPrice !== undefined && p.price > maxPrice) return false;
    if (term) {
      const haystack = `${p.name} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });

  return sortProducts(filtered, sort);
}

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "featured":
    default:
      return copy.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
}
