import type { LucideIcon } from "lucide-react";
import { Eye, Film, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/motion/FadeIn";

interface StatItem {
  icon: LucideIcon;
  end: number;
  format: (v: number) => string;
  suffix: string;
  label: string;
  stars?: boolean;
}

const STATS: StatItem[] = [
  {
    icon: Film,
    end: 10000,
    format: (v) => Math.round(v).toLocaleString("en-IN"),
    suffix: "+",
    label: "Scripts Generated",
  },
  {
    icon: Users,
    end: 5000,
    format: (v) => Math.round(v).toLocaleString("en-IN"),
    suffix: "+",
    label: "Happy Creators",
  },
  {
    icon: Eye,
    end: 50,
    format: (v) => String(Math.round(v)),
    suffix: "M+",
    label: "Views Generated",
  },
  {
    icon: Star,
    end: 4.9,
    format: (v) => v.toFixed(1),
    suffix: "/5",
    label: "Average Rating",
    stars: true,
  },
];

/** Five popping orange stars for the rating stat. */
function StarsRow() {
  return (
    <span className="mt-1 flex items-center gap-1" aria-label="5 star rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 15,
            delay: 0.9 + i * 0.09,
          }}
        >
          <Star className="size-5 fill-accent-primary text-accent-primary" />
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Stats — warm cream band with count-up numbers (fire once when
 * scrolled into view) and a 5-star rating flourish.
 */
export function StatsSection() {
  return (
    <section
      id="stats"
      aria-label="AniViora Craft in numbers"
      className="border-y border-border-color/70 bg-bg-primary py-18 lg:py-20"
    >
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-border-color bg-bg-card text-accent-primary shadow-card">
                  <stat.icon
                    className="size-6"
                    aria-hidden
                    {...(stat.stars
                      ? { fill: "currentColor" as const, strokeWidth: 0 }
                      : { strokeWidth: 1.75 })}
                  />
                </span>

                <p className="mt-4 font-heading text-[clamp(3rem,6vw,4.25rem)] font-bold leading-none tracking-tight text-text-primary">
                  <CountUp end={stat.end} format={stat.format} />
                  <span className="text-accent-primary">{stat.suffix}</span>
                </p>

                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  {stat.label}
                </p>

                {stat.stars && <StarsRow />}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
