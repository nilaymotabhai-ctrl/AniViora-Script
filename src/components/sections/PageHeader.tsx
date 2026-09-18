import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** dark = deep purple band · peach = light peach band */
  variant?: "dark" | "peach";
  children?: ReactNode;
}

/**
 * Shared inner-page hero band. Dark pages get the dot texture +
 * terracotta glow; peach pages get a soft warm wash.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  variant = "dark",
  children,
}: PageHeaderProps) {
  const dark = variant === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-bg-dark" : "border-b border-border-color/70 bg-bg-info"
      )}
    >
      {/* Decorations */}
      {dark ? (
        <>
          <div
            aria-hidden
            className="texture-dots-dark pointer-events-none absolute inset-0"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-24 size-96 rounded-full bg-accent-primary/12 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-primary/60 to-transparent"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-accent-primary/8 blur-3xl"
        />
      )}

      <Container
        className={cn("relative text-center", dark ? "py-20 lg:py-24" : "py-16 lg:py-20")}
      >
        {eyebrow && (
          <FadeIn y={16}>
            <p
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]",
                dark
                  ? "border-text-light/15 bg-text-light/5 text-text-light/70"
                  : "border-border-color bg-bg-card text-text-secondary shadow-card"
              )}
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent-primary" />
              {eyebrow}
            </p>
          </FadeIn>
        )}
        <FadeIn y={24} delay={0.08}>
          <h1
            className={cn(
              "mx-auto mt-5 max-w-3xl font-heading text-h1 font-bold tracking-tight",
              dark ? "text-text-light" : "text-text-primary"
            )}
          >
            {title}
          </h1>
        </FadeIn>
        {subtitle && (
          <FadeIn y={20} delay={0.16}>
            <p
              className={cn(
                "mx-auto mt-4 max-w-xl text-base leading-relaxed md:text-lg",
                dark ? "text-text-light/65" : "text-text-secondary"
              )}
            >
              {subtitle}
            </p>
          </FadeIn>
        )}
        {children && <FadeIn delay={0.24}>{children}</FadeIn>}
      </Container>
    </section>
  );
}
