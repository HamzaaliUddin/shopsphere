"use client";

import { useEffect, useState } from "react";
import { NavLinks } from "./NavLinks";
import { IconButton } from "@/components/ui";

interface MobileMenuProps {
  links: ReadonlyArray<{ href: string; label: string }>;
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <IconButton
        label="Open menu"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </IconButton>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="animate-fade-in-up absolute right-0 top-0 flex h-full w-72 flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold tracking-tight">Menu</span>
              <IconButton label="Close menu" onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                </svg>
              </IconButton>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              <NavLinks
                links={links}
                orientation="vertical"
                onNavigate={() => setOpen(false)}
              />
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
