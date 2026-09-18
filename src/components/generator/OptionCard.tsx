import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { WizardOption } from "@/lib/generator-options";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  option: WizardOption;
  selected: boolean;
  onSelect: () => void;
}

/**
 * Selectable wizard option — radio-styled card with icon tile,
 * bilingual labels and an animated check badge when active.
 */
export function OptionCard({ option, selected, onSelect }: OptionCardProps) {
  const Icon = option.icon;

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 md:p-5",
        selected
          ? "border-accent-primary bg-bg-info shadow-card"
          : "border-border-color bg-bg-card hover:-translate-y-0.5 hover:border-accent-primary/40 hover:shadow-card"
      )}
    >
      {/* Check badge */}
      {selected && (
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 14 }}
          className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-accent-primary text-text-light shadow-button"
        >
          <Check className="size-3.5" strokeWidth={3} aria-hidden />
        </motion.span>
      )}

      {/* Icon tile */}
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-xl transition-colors duration-200",
          selected
            ? "bg-accent-primary text-text-light"
            : "bg-accent-primary/10 text-accent-primary"
        )}
      >
        <Icon className="size-5.5" strokeWidth={1.75} aria-hidden />
      </span>

      {/* Labels */}
      <span className="mt-3.5 flex flex-wrap items-center gap-2">
        <span className="text-[0.95rem] font-bold leading-tight text-text-primary">
          {option.label}
        </span>
        {option.badge && (
          <span className="rounded-full bg-accent-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-text-light">
            {option.badge}
          </span>
        )}
      </span>
      {option.hindi && (
        <span className="font-hindi mt-0.5 block text-xs font-medium text-text-secondary">
          {option.hindi}
        </span>
      )}
      <span className="mt-1.5 block text-xs leading-relaxed text-text-secondary">
        {option.description}
      </span>
    </motion.button>
  );
}
