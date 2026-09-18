import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/sections/SectionHeading";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "AniViora Craft changed my YouTube channel completely. Mere scripts pehle boring the, ab har video 100K+ views laati hai. Bilkul FREE tool hai — believe nahi hota!",
    name: "Rajesh Kumar",
    role: "Animation YouTuber · 500K subscribers",
    initials: "RK",
  },
  {
    quote:
      "Main ek chhota creator hoon aur script writing sabse mushkil kaam tha. AniViora ne minutes mein complete kahani de di. Language bilkul natural bolchal + Bundeli touch hai.",
    name: "Priya Sharma",
    role: "Content Creator · Delhi",
    initials: "PS",
  },
  {
    quote:
      "Studio ke liye best tool hai. Har script unique hoti hai aur Hindi quality top-notch hai. Characters story ke hisaab se perfect aate hain. Highly recommended!",
    name: "Amit Verma",
    role: "Founder, Kahani Studio",
    initials: "AV",
  },
];

function Stars() {
  return (
    <span className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-4 fill-accent-primary text-accent-primary" />
      ))}
    </span>
  );
}

function TestimonialCard({ quote, name, role, initials }: Testimonial) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-text-light/10 bg-text-light/[0.05] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-primary/50 hover:bg-text-light/[0.08] hover:shadow-[0_10px_50px_-12px_rgba(217,107,58,0.4)]">
      <Quote
        aria-hidden
        className="absolute right-6 top-6 size-8 text-accent-primary/20"
      />
      <Stars />
      <blockquote className="mt-4 flex-1">
        <p className="text-[0.95rem] leading-relaxed text-text-light/80">
          “{quote}”
        </p>
      </blockquote>
      <footer className="mt-6 flex items-center gap-3 border-t border-text-light/10 pt-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-primary/20 font-heading text-sm font-bold text-accent-primary">
          {initials}
        </span>
        <span>
          <span className="block text-sm font-bold text-text-light">
            — {name}
          </span>
          <span className="mt-0.5 block text-xs text-text-light/55">
            {role}
          </span>
        </span>
      </footer>
    </article>
  );
}

/**
 * Testimonials — dark glass cards. Desktop: 3-up grid.
 * Mobile: auto-advancing carousel with dots (pauses on touch).
 */
export function TestimonialsSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (isDesktop || paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      5000
    );
    return () => clearInterval(id);
  }, [isDesktop, paused]);

  return (
    <section
      id="testimonials"
      aria-label="What creators say"
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
        className="pointer-events-none absolute -left-40 top-1/3 size-96 rounded-full bg-accent-primary/10 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Testimonials"
          title="What Creators Say"
          subtitle="Real creators. Real results. Real Bundeli storytelling magic."
        />

        {/* Desktop grid */}
        <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1} className="h-full">
              <TestimonialCard {...t} />
            </FadeIn>
          ))}
        </div>

        {/* Mobile carousel */}
        <div
          className="mt-12 lg:hidden"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="relative min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 64 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -64 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <TestimonialCard {...TESTIMONIALS[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-7 bg-accent-primary"
                    : "w-2 bg-text-light/25 hover:bg-text-light/50"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
