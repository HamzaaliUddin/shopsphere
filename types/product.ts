export type CategoryId =
  | "apparel"
  | "footwear"
  | "accessories"
  | "electronics"
  | "home"
  | "outdoor";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: "USD";
  category: CategoryId;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  images: ProductImage[];
}
