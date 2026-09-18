import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  Clock,
  Mic,
  Play,
  Rocket,
  Sparkles,
  Star,
  Wand2,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { YoutubeIcon } from "@/components/ui/BrandIcons";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScriptPreviewCard } from "@/components/sections/hero/ScriptPreviewCard";

/* ---------- Motion variants ---------- */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* ---------- Trust badges ---------- */
const TRUST_BADGES: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}[] = [
  { icon: Sparkles, title: "100% Free Forever", sub: "No hidden charges" },
  { icon: Rocket, title: "10,000+ Scripts", sub: "Generated so far" },
  { icon: YoutubeIcon, title: "500+ YouTubers", sub: "Create with us" },
  { icon: Star, title: "4.9/5 Rating", sub: "From real creators" },
];

/* ---------- Floating chip around the visual ---------- */
function FloatingChip({
  icon: Icon,
  title,
  sub,
  className,
  appearDelay = 0,
  floatDuration = 6,
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  className?: string;
  appearDelay?: number;
  floatDuration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.55 + appearDelay, duration: 0.55, ease: EASE }}
      className={cn("absolute z-20", className)}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: appearDelay,
        }}
        className="flex items-center gap-2.5 rounded-2xl border border-border-color bg-bg-card/95 px-3.5 py-2.5 shadow-card-hover backdrop-blur-sm"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block text-xs font-bold text-text-primary">
            {title}
          </span>
          <span className="block text-[10px] font-medium text-text-secondary">
            {sub}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}

/** "AI Writing…" chip with pulsing dots. */
function AiWritingChip({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.55, ease: EASE }}
      className={cn("absolute z-20", className)}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2.5 rounded-full border border-accent-primary/25 bg-bg-dark px-4 py-2.5 shadow-card-hover"
      >
        <Sparkles className="size-4 text-accent-primary" aria-hidden />
        <span className="text-xs font-bold text-text-light">AI Writing</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.22,
                ease: "easeInOut",
              }}
              className="size-1 rounded-full bg-accent-primary"
            />
          ))}
        </span>
      </motion.div>
    </motion.div>
  );
}

/**
 * Hero — animated split layout. Left: headline, CTAs, trust badges.
 * Right: floating Hindi script editor mockup with live typewriter.
 */
export function HeroSection() {
  return (
    <section className="texture-dots relative overflow-hidden">
      {/* Ambient background washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-28 size-[28rem] rounded-full bg-accent-primary/12 blur-3xl" />
        <div className="absolute -left-24 top-1/2 size-80 rounded-full bg-bg-dark/6 blur-3xl" />
      </div>

      <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-2 lg:gap-10 lg:py-24 xl:gap-16">
        {/* =============== LEFT: Copy & CTAs =============== */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* Eyebrow badge */}
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border-color bg-bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary shadow-card"
          >
            <Sparkles className="size-3.5 text-accent-primary" aria-hidden />
            Free AI Script Studio — Hindi 2D Animation
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-heading text-[clamp(2.6rem,5.4vw,3.5rem)] font-bold leading-[1.07] tracking-tight text-text-primary"
          >
            Generate Viral{" "}
            <span className="relative inline-block whitespace-nowrap text-accent-primary">
              Hindi
              <svg
                aria-hidden
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full"
              >
                <path
                  d="M4 8.5 C 62 3.5, 158 3, 216 7.5"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.45"
                />
              </svg>
            </span>{" "}
            Animation Scripts in{" "}
            <span className="italic">Minutes</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
          >
            100% FREE AI-powered tool that creates 35–41 minute viral stories
            for your YouTube animation channel. No signup required. No credit
            card. Just pure creativity.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to={ROUTES.generator}
              className={buttonVariants({ size: "lg" })}
            >
              <Wand2 className="size-5" aria-hidden />
              Try Free Generator
            </Link>
            <Button
              variant="outline"
              size="lg"
              aria-label="Watch demo video (coming soon)"
              // Demo modal/player wiring arrives in Part 3.
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-accent-primary/10">
                <Play className="size-3.5 fill-accent-primary text-accent-primary" />
              </span>
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.ul
            variants={staggerParent}
            className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4"
          >
            {TRUST_BADGES.map(({ icon: Icon, title, sub }) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="flex items-center gap-3"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-color bg-bg-card text-accent-primary shadow-card">
                  <Icon
                    className="size-5"
                    aria-hidden
                    {...(Icon === Star
                      ? { fill: "currentColor", strokeWidth: 0 }
                      : {})}
                  />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-text-primary">
                    {title}
                  </span>
                  <span className="block text-[11px] font-medium text-text-secondary">
                    {sub}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* =============== RIGHT: Animated visual =============== */}
        <motion.div
          initial={{ opacity: 0, x: 56, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="relative mx-auto w-full max-w-[29rem] lg:max-w-none"
        >
          {/* Rotating dashed halo behind the card */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-accent-primary/20 animate-spin [animation-duration:60s]"
          />
          <div
            aria-hidden
            className="absolute -right-8 top-10 -z-10 size-40 rounded-full bg-accent-primary/15 blur-2xl"
          />

          {/* Main card with slow float */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <ScriptPreviewCard />
          </motion.div>

          {/* Floating context chips */}
          <AiWritingChip className="-right-1 -top-7 sm:-right-4" />
          <FloatingChip
            icon={Mic}
            title="Voiceover Ready"
            sub="Narration cues included"
            className="-right-2 top-[38%] sm:-right-9"
            appearDelay={0.15}
            floatDuration={6.5}
          />
          <FloatingChip
            icon={Clock}
            title="35–41 min"
            sub="Full episode scripts"
            className="-bottom-7 left-4 sm:left-10"
            appearDelay={0.3}
            floatDuration={7.5}
          />
          <FloatingChip
            icon={Star}
            title="Viral Hooks"
            sub="Retention-first openings"
            className="-left-2 top-16 sm:-left-8"
            appearDelay={0.45}
            floatDuration={6}
          />
        </motion.div>
      </Container>
    </section>
  );
}
