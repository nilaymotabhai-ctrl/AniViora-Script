import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import type { FaqAction, FaqItem } from "@/lib/faqs";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FaqActionPill({ action }: { action: FaqAction }) {
  const classes =
    "inline-flex items-center gap-1.5 rounded-full bg-bg-info px-3.5 py-1.5 text-xs font-semibold text-accent-hover transition-colors hover:bg-accent-primary hover:text-text-light";
  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noreferrer" className={classes}>
        {action.label}
      </a>
    );
  }
  return (
    <Link to={action.href} className={classes}>
      {action.label}
    </Link>
  );
}

interface FaqAccordionProps {
  items: FaqItem[];
  /** Which item starts open (default: first). Pass null for all closed. */
  defaultOpenIndex?: number | null;
  className?: string;
}

/**
 * One-at-a-time animated accordion. Open item gets the orange
 * icon tile + orange left accent border. Shared by Home preview & /faq.
 */
export function FaqAccordion({
  items,
  defaultOpenIndex = 0,
  className,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("space-y-3.5", className)}>
      {items.map((faq, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        return (
          <FadeIn key={faq.question} delay={i * 0.045} y={16}>
            <div
              className={cn(
                "overflow-hidden rounded-xl border border-l-[3px] transition-all duration-300",
                open
                  ? "border-border-color border-l-accent-primary bg-bg-card shadow-card"
                  : "border-border-color border-l-transparent bg-bg-card hover:border-accent-primary/30"
              )}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
              >
                <span className="flex items-center gap-3.5">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
                      open
                        ? "bg-accent-primary text-text-light"
                        : "bg-accent-primary/10 text-accent-primary"
                    )}
                  >
                    <MessageCircleQuestion className="size-4.5" aria-hidden />
                  </span>
                  <span className="font-heading text-base font-semibold text-text-primary md:text-lg">
                    {faq.question}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-text-secondary transition-transform duration-300",
                    open && "rotate-180 text-accent-primary"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[4.4rem] pr-6 md:px-6 md:pl-[4.7rem]">
                      <p className="text-sm leading-relaxed text-text-secondary md:text-[0.95rem]">
                        {faq.answer}
                      </p>
                      {faq.actions && (
                        <div className="mt-3.5 flex flex-wrap gap-2">
                          {faq.actions.map((action) => (
                            <FaqActionPill key={action.label} action={action} />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
