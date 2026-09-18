import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/sections/SectionHeading";

const STEPS = [
  {
    number: 1,
    title: "Choose Your Genre",
    description:
      "Select from Horror, Mystery, Emotional, Fantasy, Moral, or King stories",
  },
  {
    number: 2,
    title: "Set Story Parameters",
    description:
      "Pick setting, time period, supernatural elements, and core theme",
  },
  {
    number: 3,
    title: "Generate Full Script",
    description:
      "AI creates a complete viral-ready script with proper structure in under 2 minutes",
  },
  {
    number: 4,
    title: "Download & Produce",
    description:
      "Export in PDF/DOCX/TXT and start your animation production immediately",
  },
];

/**
 * "How It Works" — 4 numbered steps on white, connected by a dashed
 * timeline on desktop, followed by the AI training info box.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" aria-label="How it works" className="bg-bg-card py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Simple Process"
          title="How It Works"
          subtitle="Char aasaan steps mein apni viral kahani banayein"
        />

        {/* Steps */}
        <div className="relative mt-16">
          {/* Dashed connector (desktop only, behind the numbered circles) */}
          <div
            aria-hidden
            className="absolute left-[13%] right-[13%] top-8 hidden border-t-2 border-dashed border-border-color lg:block"
          />

          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {STEPS.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.09} className="h-full">
                <div className="group relative h-full">
                  {/* Number circle */}
                  <div className="absolute left-1/2 top-0 z-10 flex size-16 -translate-x-1/2 items-center justify-center rounded-full bg-accent-primary font-heading text-2xl font-bold text-text-light shadow-button ring-4 ring-bg-card transition-transform duration-300 group-hover:scale-110">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="mt-8 flex h-[calc(100%-2rem)] flex-col items-center rounded-card border border-border-color bg-bg-card px-6 pb-8 pt-12 text-center shadow-card transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-accent-primary/40 group-hover:shadow-card-hover">
                    <h3 className="font-heading text-h4 font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Info box */}
        <FadeIn delay={0.15} className="mt-14">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-border-color/70 bg-bg-info p-6 sm:flex-row sm:items-center md:p-8">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-primary text-text-light shadow-button">
              <Sparkles className="size-6" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">
              Our AI is trained on thousands of viral Hindi animation scripts
              with authentic Bundeli/Bolchal flavor, updated monthly with the
              latest storytelling patterns and cultural context — ensuring your
              stories connect deeply with Hindi audiences.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
