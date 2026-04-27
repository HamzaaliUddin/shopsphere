import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "apparel",
    name: "Apparel",
    description: "Soft basics and statement pieces.",
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Everyday sneakers and runners.",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Bags, watches, and small goods.",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Audio, wearables, and gear.",
  },
  {
    id: "home",
    name: "Home",
    description: "Calm, considered objects for daily life.",
  },
  {
    id: "outdoor",
    name: "Outdoor",
    description: "Built for trails, travel, and weather.",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
