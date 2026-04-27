import Link from "next/link";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { CartIndicator } from "./CartIndicator";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products?category=apparel", label: "Apparel" },
  { href: "/products?category=footwear", label: "Footwear" },
  { href: "/products?category=accessories", label: "Accessories" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <path
                d="M4 9l8-5 8 5v9l-8 5-8-5z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M4 9l8 5 8-5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">ShopSphere</span>
        </Link>

        <nav className="hidden md:block" aria-label="Primary">
          <NavLinks links={NAV_LINKS} />
        </nav>

        <div className="flex items-center gap-1">
          <CartIndicator />
          <MobileMenu links={NAV_LINKS} />
        </div>
      </Container>
    </header>
  );
}
