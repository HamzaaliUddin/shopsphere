import { Hero } from "@/components/home/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ValueProps } from "@/components/home/ValueProps";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <ValueProps />
      <FeaturedProducts />
    </>
  );
}
