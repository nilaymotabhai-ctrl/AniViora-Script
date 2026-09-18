import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CustomScriptCta } from "@/components/sections/CustomScriptCta";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqPreview } from "@/components/sections/FaqPreview";

/**
 * Home — complete public landing page.
 * Hero (P2) · How It Works / Features / Stats (P3) ·
 * Custom Script CTA / Testimonials / FAQ preview (P4).
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <StatsSection />
      <CustomScriptCta />
      <TestimonialsSection />
      <FaqPreview />
    </>
  );
}
