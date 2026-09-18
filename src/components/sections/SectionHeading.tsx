import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

interface SectionHeadingProps {
  /** Small pill text above the title. */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  /** Light text for dark backgrounds. */
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
}

/** Consistent heading block used at the top of every page section. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <FadeIn
      className={cn(
        "flex max-w-2xl flex-col",
        centered ? "mx-auto items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]",
            dark
              ? "border-text-light/15 bg-text-light/5 text-text-light/70"
              : "border-border-color bg-bg-card text-text-secondary shadow-card"
          )}
        >
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-accent-primary"
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-5 font-heading text-h2 font-bold tracking-tight",
          dark ? "text-text-light" : "text-text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "font-hindi mt-4 text-base leading-relaxed md:text-lg",
            dark ? "text-text-light/60" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
