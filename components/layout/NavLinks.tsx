"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: ReadonlyArray<NavLink>;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

export function NavLinks({ links, orientation = "horizontal", onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-1"
          : "flex flex-col gap-1",
      )}
    >
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted hover:text-foreground hover:bg-surface",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
