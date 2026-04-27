import { Container } from "@/components/layout";

const PROPS = [
  {
    title: "Free shipping",
    description: "Complimentary on orders over $75. Always carbon-offset.",
  },
  {
    title: "30-day returns",
    description: "No-questions-asked returns on every order.",
  },
  {
    title: "Made to last",
    description: "Better materials, better construction, fewer purchases.",
  },
  {
    title: "Real support",
    description: "Talk to a human, in your timezone, within a day.",
  },
] as const;

export function ValueProps() {
  return (
    <section className="border-y border-border bg-surface">
      <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {PROPS.map((p) => (
          <div key={p.title}>
            <h3 className="text-sm font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
