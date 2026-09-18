import { Link } from "react-router-dom";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { FAQS } from "@/lib/faqs";
import { ROUTES, SITE } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Full FAQ page — all questions + "Still have questions?" CTA. */
export default function FAQ() {
  return (
    <>
      <PageHeader
        variant="peach"
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Find answers to all your questions about AniViora Craft."
      />

      <section aria-label="All questions" className="bg-bg-card py-16 lg:py-20">
        <Container size="narrow">
          <FaqAccordion items={FAQS} />

          {/* Still have questions CTA */}
          <FadeIn className="mt-16">
            <div className="rounded-3xl border border-border-color/70 bg-bg-info p-8 text-center md:p-12">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent-primary text-text-light shadow-button">
                <MessageCircleQuestion className="size-7" aria-hidden />
              </span>
              <h2 className="mt-5 font-heading text-h3 font-semibold text-text-primary">
                Still have questions?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">
                Koi sawaal reh gaya? Hum yahin hain madad ke liye — message
                karein, hum 24 hours mein reply karte hain.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to={ROUTES.contact} className={buttonVariants()}>
                  Contact Us
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <a
                  href={SITE.whatsappChatHref}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <WhatsAppIcon className="size-4" aria-hidden />
                  {SITE.phone}
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
