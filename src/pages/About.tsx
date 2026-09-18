import type { LucideIcon } from "lucide-react";
import {
  Flag,
  HeartHandshake,
  MapPin,
  Palette,
  Phone,
  Quote,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import { SITE } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsSection } from "@/components/sections/StatsSection";

/* ---------- Section 1: Our Story ---------- */
function OurStory() {
  return (
    <section aria-label="Our story" className="py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeading align="left" eyebrow="Our Story" title="Born in Bundelkhand, Built for Bharat" className="max-w-none" />
            <FadeIn delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
                AniViora Craft was born from a simple observation: Hindi content
                creators were struggling to write viral scripts while foreign
                tools dominated the market. Founded in Baldeogarh, Tikamgarh
                District, Madhya Pradesh, we set out to change that. Today,
                we're proud to offer India's first FREE AI-powered Hindi
                animation script generator that truly understands our language,
                culture, and storytelling traditions.
              </p>
            </FadeIn>
          </div>

          {/* Typographic art card */}
          <FadeIn delay={0.15}>
            <div className="texture-dots-dark relative overflow-hidden rounded-3xl border border-text-light/10 bg-bg-dark p-9 text-center shadow-card-hover">
              <Sparkles
                aria-hidden
                className="mx-auto size-7 text-accent-primary"
              />
              <p className="font-hindi mt-5 font-heading text-h3 font-semibold leading-snug text-text-light">
                कहानियाँ जहाँ ज़िंदा होती हैं
              </p>
              <p className="font-hindi mt-3 text-sm italic text-text-light/60">
                {SITE.hindiTagline} — {SITE.tagline}
              </p>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-accent-primary/70 to-transparent" />
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-text-light/50">
                <MapPin className="size-3.5 text-accent-primary" aria-hidden />
                Baldeogarh, Madhya Pradesh
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Section 2: Our Mission ---------- */
function OurMission() {
  return (
    <section aria-label="Our mission" className="bg-bg-info py-20 lg:py-24">
      <Container size="narrow">
        <FadeIn>
          <Card padding="lg" className="relative text-center shadow-card-hover">
            <span
              aria-hidden
              className="absolute -top-6 left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-accent-primary text-text-light shadow-button"
            >
              <Target className="size-6" />
            </span>
            <h2 className="mt-4 font-heading text-h2 font-bold text-text-primary">
              Our Mission
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              To empower every Hindi content creator — from small village
              YouTubers to big animation studios — with world-class storytelling
              tools, completely FREE. We believe great stories shouldn't have a
              price tag.
            </p>
          </Card>
        </FadeIn>
      </Container>
    </section>
  );
}

/* ---------- Section 3: Meet the Founder ---------- */
function MeetTheFounder() {
  return (
    <section
      aria-label="Meet the founder"
      className="relative overflow-hidden bg-bg-dark py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="texture-dots-dark pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-accent-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/60 to-transparent"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Portrait placeholder (stylized avatar until photo ships) */}
          <FadeIn>
            <div className="relative mx-auto max-w-sm rounded-3xl border border-text-light/10 bg-text-light/[0.05] p-9 text-center backdrop-blur-sm">
              <div
                aria-hidden
                className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/60 to-transparent"
              />
              <div className="relative mx-auto flex size-40 items-center justify-center rounded-full border-2 border-dashed border-accent-primary/45 bg-accent-primary/12">
                <span className="font-heading text-5xl font-bold text-accent-primary">
                  DC
                </span>
                <span className="absolute -right-2 -top-2 flex size-9 items-center justify-center rounded-full bg-accent-primary text-text-light shadow-button">
                  <Sparkles className="size-4" aria-hidden />
                </span>
              </div>
              <p className="mt-6 font-heading text-h4 font-semibold text-text-light">
                {SITE.founder}
              </p>
              <p className="mt-1 text-sm font-medium text-accent-primary">
                Founder & Creative Director
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-text-light/10 bg-text-light/5 px-3.5 py-1.5 text-xs text-text-light/60">
                <MapPin className="size-3.5 text-accent-primary" aria-hidden />
                Baldeogarh, Tikamgarh, MP
              </p>
            </div>
          </FadeIn>

          {/* Bio */}
          <div>
            <SectionHeading
              dark
              align="left"
              eyebrow="Meet the Founder"
              title="Dev Chaurasiya"
              className="max-w-none"
            />
            <FadeIn delay={0.1}>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                Founder & Creative Director
              </p>

              <div className="relative mt-7 rounded-2xl border border-text-light/10 bg-text-light/[0.05] p-6 backdrop-blur-sm">
                <Quote
                  aria-hidden
                  className="absolute -top-4 left-6 size-8 rounded-lg bg-accent-primary p-1.5 text-text-light"
                />
                <p className="text-base italic leading-relaxed text-text-light/85 md:text-lg">
                  "I started AniViora Craft with one dream — to make
                  professional storytelling accessible to every Hindi creator in
                  India. From my hometown Baldeogarh to creators across the
                  country, we're building something special together."
                </p>
              </div>

              <ul className="mt-7 space-y-3">
                <li className="flex items-center gap-3 text-sm text-text-light/70">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-accent-primary/15 text-accent-primary">
                    <MapPin className="size-4" aria-hidden />
                  </span>
                  Baldeogarh, Tikamgarh, Madhya Pradesh, India
                </li>
                <li className="flex items-center gap-3 text-sm text-text-light/70">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-accent-primary/15 text-accent-primary">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  {SITE.phone}
                </li>
              </ul>

              <a
                href={SITE.whatsappChatHref}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ className: "mt-8" })}
              >
                Connect on WhatsApp
              </a>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Section 4: Our Values ---------- */
const VALUES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Palette,
    title: "Creativity First",
    description: "Every script is a work of art",
  },
  {
    icon: Flag,
    title: "Made in India",
    description: "Built by Indians, for Indians",
  },
  {
    icon: HeartHandshake,
    title: "Always Free",
    description: "Storytelling for everyone",
  },
  {
    icon: Rocket,
    title: "Constantly Improving",
    description: "Weekly updates and improvements",
  },
];

function OurValues() {
  return (
    <section aria-label="Our values" className="py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Values"
          title="What Drives Us"
          subtitle="Chaar siddhant jo har script mein dikhte hain"
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.08} className="h-full">
              <Card
                hoverable
                padding="lg"
                className="group flex h-full items-start gap-5"
              >
                <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-colors duration-300 group-hover:bg-accent-primary group-hover:text-text-light">
                  <value.icon className="size-6.5" strokeWidth={1.75} aria-hidden />
                </span>
                <span>
                  <span className="block font-heading text-h4 font-semibold text-text-primary">
                    {value.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-text-secondary">
                    {value.description}
                  </span>
                </span>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** About — story, mission, founder, values + stats finale. */
export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="About AniViora Craft"
        subtitle="Where Stories Come Alive"
      />
      <OurStory />
      <OurMission />
      <MeetTheFounder />
      <OurValues />
      <StatsSection />
    </>
  );
}
