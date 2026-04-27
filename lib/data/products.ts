import type { Product } from "@/types";

function img(seed: string, alt: string) {
  return {
    src: `https://picsum.photos/seed/${seed}/900/1200`,
    alt,
  };
}

export const products: Product[] = [
  {
    id: "p-001",
    slug: "atlas-merino-crew",
    name: "Atlas Merino Crew",
    description:
      "A featherweight merino wool sweater with a clean crew neckline. Ribbed cuffs and hem hold their shape through long days, while breathable fibers keep you comfortable on planes, trains, or the walk home.",
    price: 128,
    compareAtPrice: 158,
    currency: "USD",
    category: "apparel",
    tags: ["wool", "knit", "everyday"],
    rating: 4.7,
    reviewCount: 214,
    stock: 32,
    isFeatured: true,
    isNew: false,
    images: [
      img("merino-a", "Atlas Merino Crew front view"),
      img("merino-b", "Atlas Merino Crew side detail"),
      img("merino-c", "Atlas Merino Crew fabric close-up"),
    ],
  },
  {
    id: "p-002",
    slug: "harbor-overshirt",
    name: "Harbor Overshirt",
    description:
      "An unstructured overshirt cut from washed cotton twill. Layers cleanly over tees and under heavier coats, with reinforced chest pockets for the small things.",
    price: 184,
    currency: "USD",
    category: "apparel",
    tags: ["cotton", "layer", "unisex"],
    rating: 4.5,
    reviewCount: 142,
    stock: 18,
    isFeatured: true,
    isNew: true,
    images: [
      img("harbor-a", "Harbor Overshirt full view"),
      img("harbor-b", "Harbor Overshirt detail"),
    ],
  },
  {
    id: "p-003",
    slug: "studio-tee-pack",
    name: "Studio Tee — 3 Pack",
    description:
      "Heavyweight 240gsm cotton tees with a relaxed boxy fit. Pre-washed for zero shrinkage, finished with a flat-lock collar that holds its shape wash after wash.",
    price: 96,
    compareAtPrice: 120,
    currency: "USD",
    category: "apparel",
    tags: ["cotton", "basics", "pack"],
    rating: 4.8,
    reviewCount: 612,
    stock: 84,
    isFeatured: true,
    isNew: false,
    images: [
      img("studio-tee-a", "Studio Tee three pack"),
      img("studio-tee-b", "Studio Tee folded"),
    ],
  },
  {
    id: "p-004",
    slug: "trail-runner-x2",
    name: "Trail Runner X2",
    description:
      "A trail-ready silhouette with a grippy lugged outsole and breathable mesh upper. Foam midsole tuned for long miles on mixed terrain.",
    price: 168,
    currency: "USD",
    category: "footwear",
    tags: ["running", "trail", "performance"],
    rating: 4.6,
    reviewCount: 308,
    stock: 24,
    isFeatured: true,
    isNew: true,
    images: [
      img("runner-a", "Trail Runner X2 outside"),
      img("runner-b", "Trail Runner X2 sole"),
      img("runner-c", "Trail Runner X2 upper"),
    ],
  },
  {
    id: "p-005",
    slug: "court-low-canvas",
    name: "Court Low Canvas",
    description:
      "A low-profile canvas court shoe with a vulcanized rubber sole. Minimal branding, padded collar, and a cotton lining for bare-foot wear.",
    price: 78,
    currency: "USD",
    category: "footwear",
    tags: ["canvas", "casual"],
    rating: 4.3,
    reviewCount: 198,
    stock: 56,
    isFeatured: false,
    isNew: false,
    images: [
      img("court-a", "Court Low Canvas pair"),
      img("court-b", "Court Low Canvas side"),
    ],
  },
  {
    id: "p-006",
    slug: "field-leather-derby",
    name: "Field Leather Derby",
    description:
      "Hand-finished derby in full-grain leather, mounted on a stitched leather sole with a discreet rubber heel pad for traction.",
    price: 295,
    currency: "USD",
    category: "footwear",
    tags: ["leather", "dress", "handmade"],
    rating: 4.9,
    reviewCount: 76,
    stock: 12,
    isFeatured: false,
    isNew: false,
    images: [
      img("derby-a", "Field Leather Derby pair"),
      img("derby-b", "Field Leather Derby detail"),
    ],
  },
  {
    id: "p-007",
    slug: "voyager-25l-pack",
    name: "Voyager 25L Pack",
    description:
      "A water-resistant daypack with a padded laptop sleeve, dual hip pockets, and a sternum strap. Recycled ripstop body with reinforced bartacks.",
    price: 142,
    compareAtPrice: 168,
    currency: "USD",
    category: "accessories",
    tags: ["bag", "travel", "recycled"],
    rating: 4.7,
    reviewCount: 421,
    stock: 38,
    isFeatured: true,
    isNew: false,
    images: [
      img("voyager-a", "Voyager 25L Pack front"),
      img("voyager-b", "Voyager 25L Pack interior"),
      img("voyager-c", "Voyager 25L Pack straps"),
    ],
  },
  {
    id: "p-008",
    slug: "modular-bifold-wallet",
    name: "Modular Bifold Wallet",
    description:
      "Slim bifold cut from vegetable-tanned leather, with six card slots and a removable cash sleeve. Develops a deep patina with daily carry.",
    price: 88,
    currency: "USD",
    category: "accessories",
    tags: ["leather", "edc"],
    rating: 4.4,
    reviewCount: 153,
    stock: 64,
    isFeatured: false,
    isNew: true,
    images: [
      img("wallet-a", "Modular Bifold Wallet open"),
      img("wallet-b", "Modular Bifold Wallet closed"),
    ],
  },
  {
    id: "p-009",
    slug: "meridian-automatic-watch",
    name: "Meridian Automatic Watch",
    description:
      "A 38mm automatic watch with a sapphire crystal, sandblasted dial, and exhibition caseback. 100m water resistance, 40-hour power reserve.",
    price: 695,
    currency: "USD",
    category: "accessories",
    tags: ["watch", "automatic", "sapphire"],
    rating: 4.8,
    reviewCount: 92,
    stock: 8,
    isFeatured: true,
    isNew: false,
    images: [
      img("watch-a", "Meridian Automatic Watch face"),
      img("watch-b", "Meridian Automatic Watch caseback"),
    ],
  },
  {
    id: "p-010",
    slug: "pulse-wireless-earbuds",
    name: "Pulse Wireless Earbuds",
    description:
      "Active noise-canceling earbuds with adaptive transparency, multipoint pairing, and 32 hours of total playback with the charging case.",
    price: 219,
    compareAtPrice: 249,
    currency: "USD",
    category: "electronics",
    tags: ["audio", "wireless", "anc"],
    rating: 4.6,
    reviewCount: 1287,
    stock: 47,
    isFeatured: true,
    isNew: true,
    images: [
      img("buds-a", "Pulse Wireless Earbuds case"),
      img("buds-b", "Pulse Wireless Earbuds detail"),
    ],
  },
  {
    id: "p-011",
    slug: "lumen-desk-lamp",
    name: "Lumen Desk Lamp",
    description:
      "A weighted aluminum desk lamp with stepless dimming and a warm-to-cool tunable LED. USB-C passthrough on the base.",
    price: 174,
    currency: "USD",
    category: "home",
    tags: ["lighting", "office"],
    rating: 4.5,
    reviewCount: 88,
    stock: 22,
    isFeatured: false,
    isNew: false,
    images: [
      img("lamp-a", "Lumen Desk Lamp on"),
      img("lamp-b", "Lumen Desk Lamp base"),
    ],
  },
  {
    id: "p-012",
    slug: "stoneware-mug-set",
    name: "Stoneware Mug Set",
    description:
      "A set of four hand-glazed stoneware mugs. Slight variations between pieces — each one is a little different.",
    price: 64,
    currency: "USD",
    category: "home",
    tags: ["ceramic", "kitchen"],
    rating: 4.7,
    reviewCount: 234,
    stock: 41,
    isFeatured: true,
    isNew: false,
    images: [
      img("mug-a", "Stoneware mug set arranged"),
      img("mug-b", "Stoneware mug close-up"),
    ],
  },
  {
    id: "p-013",
    slug: "linen-throw-blanket",
    name: "Linen Throw Blanket",
    description:
      "A heavyweight stonewashed linen throw with hand-knotted tassels. Softens with every wash.",
    price: 138,
    currency: "USD",
    category: "home",
    tags: ["linen", "textiles"],
    rating: 4.6,
    reviewCount: 117,
    stock: 19,
    isFeatured: false,
    isNew: true,
    images: [
      img("throw-a", "Linen throw draped"),
      img("throw-b", "Linen throw detail"),
    ],
  },
  {
    id: "p-014",
    slug: "summit-3l-shell",
    name: "Summit 3L Shell",
    description:
      "A waterproof, breathable 3-layer shell with fully taped seams, a helmet-compatible hood, and pit zips for variable conditions.",
    price: 389,
    currency: "USD",
    category: "outdoor",
    tags: ["shell", "waterproof", "alpine"],
    rating: 4.8,
    reviewCount: 64,
    stock: 14,
    isFeatured: true,
    isNew: false,
    images: [
      img("shell-a", "Summit 3L Shell on form"),
      img("shell-b", "Summit 3L Shell hood"),
    ],
  },
  {
    id: "p-015",
    slug: "ridge-titanium-flask",
    name: "Ridge Titanium Flask",
    description:
      "A 750ml double-walled titanium flask. Holds heat for 12 hours, ice for 24, and weighs less than the steel competition.",
    price: 98,
    currency: "USD",
    category: "outdoor",
    tags: ["titanium", "hydration"],
    rating: 4.4,
    reviewCount: 188,
    stock: 53,
    isFeatured: false,
    isNew: true,
    images: [
      img("flask-a", "Ridge Titanium Flask side"),
      img("flask-b", "Ridge Titanium Flask cap"),
    ],
  },
  {
    id: "p-016",
    slug: "tracker-pro-band",
    name: "Tracker Pro Band",
    description:
      "A lightweight fitness band with a high-contrast OLED, week-long battery, and built-in GPS. Tracks runs, rides, swims, and sleep.",
    price: 159,
    currency: "USD",
    category: "electronics",
    tags: ["fitness", "wearable", "gps"],
    rating: 4.3,
    reviewCount: 503,
    stock: 71,
    isFeatured: false,
    isNew: false,
    images: [
      img("tracker-a", "Tracker Pro Band on wrist"),
      img("tracker-b", "Tracker Pro Band screen"),
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
