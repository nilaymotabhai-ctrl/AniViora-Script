import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardProgressProps {
  /** Current step, 1-indexed. */
  current: number;
  /** Total steps. */
  total: number;
  /** Short labels for each step (progress dots). */
  labels: string[];
}

/**
 * Wizard progress header — step dots with labels on desktop,
 * a compact counter on mobile, and an animated fill bar below.
 */
export function WizardProgress({ current, total, labels }: WizardProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div>
      {/* Counter + dots */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-text-primary">
          Step {current} of {total}
          <span className="ml-2 hidden font-medium text-text-secondary sm:inline">
            · {Math.round(percent)}% complete
          </span>
        </p>

        {/* Step dots */}
        <ol className="flex items-center gap-1.5 md:gap-2" aria-label="Progress">
          {labels.map((label, i) => {
            const stepNo = i + 1;
            const done = stepNo < current;
            const active = stepNo === current;
            return (
              <li key={label} className="flex items-center gap-1.5 md:gap-2">
                <span
                  aria-current={active ? "step" : undefined}
                  title={label}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300",
                    done && "bg-accent-primary text-text-light",
                    active &&
                      "bg-bg-dark text-text-light ring-4 ring-accent-primary/25",
                    !done && !active && "bg-border-color/60 text-text-secondary"
                  )}
                >
                  {done ? (
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  ) : (
                    stepNo
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-semibold xl:inline",
                    active ? "text-text-primary" : "text-text-secondary/70"
                  )}
                >
                  {label}
                </span>
                {stepNo < total && (
                  <span
                    aria-hidden
                    className={cn(
                      "hidden h-px w-4 md:block",
                      done ? "bg-accent-primary" : "bg-border-color"
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Fill bar */}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-4 h-2 overflow-hidden rounded-full bg-border-color/50"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-hover"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
      </div>
    </div>
  );
}
