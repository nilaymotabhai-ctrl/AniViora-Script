import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  /** Final numeric value. */
  end: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Format the animated value (default: rounded integer string). */
  format?: (value: number) => string;
  className?: string;
}

/**
 * Animated number that counts from 0 to `end` when scrolled into view.
 * Renders through a Framer Motion value — no React re-renders per frame.
 */
export function CountUp({
  end,
  duration = 2.4,
  format = (v) => String(Math.round(v)),
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const value = useMotionValue(0);
  const text = useTransform(value, format);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, end, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, end, duration, value]);

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {text}
    </motion.span>
  );
}
