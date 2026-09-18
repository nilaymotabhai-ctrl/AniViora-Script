import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FadeInProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  className?: string;
  /** Re-animate every time it enters the viewport (default: once). */
  replay?: boolean;
}

/**
 * Standard scroll-reveal wrapper — fades content up as it enters
 * the viewport. Used across all sections for consistent motion.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 28,
  className,
  replay = false,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: !replay, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
