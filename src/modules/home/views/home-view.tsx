import { Features } from "@/modules/home/components/features";
import { Footer } from "@/modules/home/components/footer";
import { Hero } from "@/modules/home/components/hero";
import { HowItWorks } from "@/modules/home/components/how-it-works";

export function HomeView() {
  return (
    <main className="mx-auto flex min-h-screen flex-col gap-32">
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
