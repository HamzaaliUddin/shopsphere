import type { Metadata } from "next";
import { Container } from "@/components/layout";
import { CartList } from "@/components/cart";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the items in your shopping cart.",
};

export default function CartPage() {
  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Bag
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Your cart
        </h1>
      </header>
      <CartList />
    </Container>
  );
}
