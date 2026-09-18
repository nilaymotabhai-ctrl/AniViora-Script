import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/faqs";
import { ROUTES } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

/**
 * Home FAQ preview — top 6 questions, then a link to the full /faq page.
 */
export function FaqPreview() {
  return (
    <section
      id="faq-preview"
      aria-label="Frequently asked questions"
      className="bg-bg-card py-20 lg:py-24"
    >
      <Container size="narrow">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Sab kuch clear, simple, aur seedha"
        />

        <FaqAccordion items={FAQS.slice(0, 6)} className="mt-12" />

        {/* View all link */}
        <FadeIn delay={0.1} className="mt-10 text-center">
          <Link
            to={ROUTES.faq}
            className={buttonVariants({ variant: "outline" })}
          >
            View all FAQs
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
