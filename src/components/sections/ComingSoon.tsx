import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Hammer, Sparkles } from "lucide-react";
import { ROUTES, SITE } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ComingSoonProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  /** Optional note about which build part delivers this page. */
  partNote?: string;
}

/**
 * Elegant placeholder used across routes until their dedicated
 * sections ship in Parts 2–10.
 */
export function ComingSoon({
  icon: Icon,
  eyebrow,
  title,
  description,
  partNote,
}: ComingSoonProps) {
  return (
    <section className="texture-dots relative overflow-hidden">
      <Container
        size="narrow"
        className="flex min-h-[62svh] flex-col items-center justify-center py-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Icon medallion */}
          <div className="relative">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-accent-primary/12 text-accent-primary">
              <Icon className="size-9" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border border-border-color bg-bg-card shadow-card">
              <Sparkles className="size-4 text-accent-primary" aria-hidden />
            </div>
          </div>

          {/* Eyebrow */}
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border-color bg-bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            <Hammer className="size-3.5 text-accent-primary" aria-hidden />
            {eyebrow}
          </p>

          {/* Title */}
          <h1 className="mt-6 text-h2 md:text-h1">{title}</h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            {description}
          </p>

          {partNote && (
            <p className="mt-4 rounded-full bg-bg-info px-4 py-1.5 text-xs font-medium text-accent-hover">
              {partNote}
            </p>
          )}

          {/* Actions */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={ROUTES.home}
              className={buttonVariants({ variant: "outline" })}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Home
            </Link>
            <Link to={ROUTES.generator} className={buttonVariants()}>
              Open the Generator
            </Link>
          </div>

          {/* Hindi tagline */}
          <p className="font-hindi mt-10 text-sm italic text-text-secondary/80">
            {SITE.hindiTagline} — {SITE.tagline}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
