"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import type { CategoryId, Category, ProductFilters, SortOption } from "@/types";
import { buildProductsUrl } from "@/lib/utils/url";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

interface ProductFiltersUIProps {
  categories: ReadonlyArray<Category>;
  active: ProductFilters;
  priceBounds: { min: number; max: number };
  resultCount: number;
}

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to high",
  "price-desc": "Price: High to low",
  "rating-desc": "Highest rated",
  newest: "Newest",
};

export function ProductFiltersUI({
  categories,
  active,
  priceBounds,
  resultCount,
}: ProductFiltersUIProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (next: Partial<ProductFilters>) => {
      const merged: ProductFilters = { ...active, ...next };
      startTransition(() => {
        router.push(buildProductsUrl(merged), { scroll: false });
      });
    },
    [active, router],
  );

  const toggleCategory = (id: CategoryId) => {
    const set = new Set(active.categories);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    navigate({ categories: Array.from(set) });
  };

  const setSort = (sort: SortOption) => navigate({ sort });

  const setPrice = (next: { minPrice?: number; maxPrice?: number }) =>
    navigate({ ...next });

  const hasActiveFilters = useMemo(
    () =>
      active.categories.length > 0 ||
      active.minPrice !== undefined ||
      active.maxPrice !== undefined ||
      active.search !== undefined ||
      active.sort !== "featured",
    [active],
  );

  const clearAll = () => {
    startTransition(() => {
      router.push("/products", { scroll: false });
    });
  };

  return (
    <div
      className={cn("flex flex-col gap-8", isPending && "opacity-70")}
      aria-busy={isPending}
      data-search={searchParams.toString()}
    >
      <FilterBlock title="Categories">
        <ul className="flex flex-col gap-2">
          {categories.map((c) => {
            const checked = active.categories.includes(c.id);
            return (
              <li key={c.id}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(c.id)}
                    className="h-4 w-4 rounded border-border accent-foreground"
                  />
                  <span className={checked ? "font-medium" : "text-muted"}>{c.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </FilterBlock>

      <FilterBlock title="Price">
        <PriceRange
          bounds={priceBounds}
          minPrice={active.minPrice}
          maxPrice={active.maxPrice}
          onChange={setPrice}
        />
      </FilterBlock>

      <FilterBlock title="Sort by">
        <div className="flex flex-col gap-1.5">
          {(Object.keys(SORT_LABELS) as SortOption[]).map((sort) => {
            const checked = active.sort === sort;
            return (
              <label key={sort} className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="radio"
                  name="sort"
                  checked={checked}
                  onChange={() => setSort(sort)}
                  className="h-4 w-4 border-border accent-foreground"
                />
                <span className={checked ? "font-medium" : "text-muted"}>
                  {SORT_LABELS[sort]}
                </span>
              </label>
            );
          })}
        </div>
      </FilterBlock>

      <div className="flex items-center justify-between border-t border-border pt-5 text-xs text-muted">
        <span>{resultCount} result{resultCount === 1 ? "" : "s"}</span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

interface PriceRangeProps {
  bounds: { min: number; max: number };
  minPrice?: number;
  maxPrice?: number;
  onChange: (next: { minPrice?: number; maxPrice?: number }) => void;
}

function PriceRange({ bounds, minPrice, maxPrice, onChange }: PriceRangeProps) {
  const stops = useMemo(() => {
    const range = bounds.max - bounds.min;
    return [
      bounds.min + range * 0.25,
      bounds.min + range * 0.5,
      bounds.min + range * 0.75,
    ].map((v) => Math.round(v / 5) * 5);
  }, [bounds]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {stops.map((stop) => {
          const isActive = maxPrice === stop;
          return (
            <button
              key={stop}
              type="button"
              onClick={() => onChange({ maxPrice: isActive ? undefined : stop })}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              Under ${stop}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <PriceInput
          label="Min"
          value={minPrice}
          placeholder={`$${bounds.min}`}
          onCommit={(v) => onChange({ minPrice: v })}
        />
        <PriceInput
          label="Max"
          value={maxPrice}
          placeholder={`$${bounds.max}`}
          onCommit={(v) => onChange({ maxPrice: v })}
        />
      </div>
    </div>
  );
}

interface PriceInputProps {
  label: string;
  value: number | undefined;
  placeholder: string;
  onCommit: (next: number | undefined) => void;
}

function PriceInput({ label, value, placeholder, onCommit }: PriceInputProps) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted">
      {label}
      <input
        type="number"
        inputMode="numeric"
        defaultValue={value ?? ""}
        placeholder={placeholder}
        min={0}
        onBlur={(e) => {
          const v = e.currentTarget.value.trim();
          onCommit(v === "" ? undefined : Number(v));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground placeholder:text-muted/70 focus-visible:border-foreground focus-visible:outline-none"
      />
    </label>
  );
}
