import Link from "next/link";
import { Container } from "@/components/layout";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Back home
      </Link>
    </Container>
  );
}
