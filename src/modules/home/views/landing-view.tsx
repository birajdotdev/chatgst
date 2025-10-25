import { CtaSection } from "@/modules/home/components/cta-section";
import { Features } from "@/modules/home/components/features";
import { Footer } from "@/modules/home/components/footer";
import { Hero } from "@/modules/home/components/hero";
import { HowItWorks } from "@/modules/home/components/how-it-works";
import { TranslationSection } from "@/modules/home/components/translation-section";
import { ChatProps } from "@/modules/home/types/chat-props";

export function LandingView(props: Omit<ChatProps, "messages">) {
  return (
    <main className="mx-auto flex min-h-screen flex-col gap-32">
      <Hero {...props} />
      <Features />
      <HowItWorks />
      <TranslationSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
