import type { LucideIcon } from "lucide-react";
import {
  Clock,
  Download,
  Languages,
  Shuffle,
  Users,
  WandSparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/sections/SectionHeading";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Clock,
    title: "Perfect YouTube Length",
    description:
      "35-41, 20-30, 10-20, 10-15 minute scripts option — ideal for monetization and audience retention",
  },
  {
    icon: Languages,
    title: "Bolchal Hindi + Bundeli Touch",
    description:
      "Natural everyday Hindi with authentic Bundelkhandi flavor — no mushkil Sanskrit words",
  },
  {
    icon: Users,
    title: "Smart Character Selection",
    description:
      "AI automatically creates the perfect cast (Hero, Villain, Mentor & more) based on your story's needs",
  },
  {
    icon: WandSparkles,
    title: "Rich Supernatural Elements",
    description:
      "Mystery, jaadu, shraap, bhoot with detailed visual descriptions for animators",
  },
  {
    icon: Shuffle,
    title: "1000+ Unique Combinations",
    description:
      "Every script is completely original — never repeat the same story twice",
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description:
      "Copy to clipboard or download as PDF, DOCX, or TXT — ready for your team",
  },
];

/**
 * Features — deep purple contrast section with glassmorphism cards
 * that glow terracotta on hover.
 */
export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-label="Features"
      className="relative overflow-hidden bg-bg-dark py-20 lg:py-24"
    >
      {/* Decorations */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/60 to-transparent"
      />
      <div
        aria-hidden
        className="texture-dots-dark pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 size-[26rem] rounded-full bg-accent-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-accent-primary/8 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Features"
          title="Everything You Need to Create Viral Content"
          subtitle="Har feature designed for Indian creators, by Indian creators"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FadeIn key={feature.title} delay={(i % 3) * 0.09} className="h-full">
              <article className="group h-full rounded-2xl border border-text-light/10 bg-text-light/[0.05] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-primary/60 hover:bg-text-light/[0.08] hover:shadow-[0_10px_50px_-12px_rgba(217,107,58,0.45)]">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-primary/15 text-accent-primary transition-colors duration-300 group-hover:bg-accent-primary group-hover:text-text-light">
                  <feature.icon
                    className="size-8"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
                <h3 className="mt-5 font-heading text-h4 font-semibold text-text-light">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-light/65">
                  {feature.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
