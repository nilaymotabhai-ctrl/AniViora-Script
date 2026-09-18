import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionPlaceholderProps {
  icon: LucideIcon;
  title: string;
  part: string;
  className?: string;
}

/**
 * Dashed "slot" shown on the Home page where upcoming sections
 * (Parts 3–5) will land. Keeps the page structure visible while developing.
 */
export function SectionPlaceholder({
  icon: Icon,
  title,
  part,
  className,
}: SectionPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border-color bg-bg-card/50 px-6 py-10 text-center transition-colors hover:border-accent-primary/40",
        className
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <p className="font-heading text-lg font-semibold text-text-primary">
        {title}
      </p>
      <p className="rounded-full bg-bg-info px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-hover">
        {part}
      </p>
    </div>
  );
}
