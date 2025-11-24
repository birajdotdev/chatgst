import { CtaSection } from "@/modules/home/components/cta-section";
import { Features } from "@/modules/home/components/features";
import { Footer } from "@/modules/home/components/footer";
import { Hero } from "@/modules/home/components/hero";
import { HowItWorks } from "@/modules/home/components/how-it-works";
import { TranslationSection } from "@/modules/home/components/translation-section";

export function LandingView() {
  return (
    <main className="mx-auto flex min-h-screen flex-col gap-32">
      <Hero />
      <Features />
      <HowItWorks />
      <TranslationSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
