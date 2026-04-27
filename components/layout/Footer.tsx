import Link from "next/link";
import { Container } from "./Container";
import { categories } from "@/lib/data/categories";

const SUPPORT_LINKS = [
  { href: "#", label: "Contact" },
  { href: "#", label: "Shipping & Returns" },
  { href: "#", label: "Size Guide" },
  { href: "#", label: "FAQ" },
];

const COMPANY_LINKS = [
  { href: "#", label: "About" },
  { href: "#", label: "Sustainability" },
  { href: "#", label: "Press" },
  { href: "#", label: "Careers" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
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
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight">ShopSphere</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Considered objects for everyday life. Free returns on every order, always.
          </p>
        </div>

        <FooterColumn title="Shop">
          {categories.slice(0, 4).map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/products?category=${cat.id}`}
                className="text-muted transition-colors hover:text-foreground"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Support">
          {SUPPORT_LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="text-muted transition-colors hover:text-foreground">
                {l.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ShopSphere. Demo storefront.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {COMPANY_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2 text-sm">{children}</ul>
    </div>
  );
}
