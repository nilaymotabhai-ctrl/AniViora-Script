import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Wand2 } from "lucide-react";

const MESSAGES = [
  "Characters set ho rahe hain…",
  "Bundeli bolchal polish ho rahi hai…",
  "Viral hook ban raha hai…",
  "Climax ki taiyari ho rahi hai…",
];

const ROTATE_MS = 900;
/** Minimum time the overlay stays up, even on fast responses. */
export const MIN_GENERATION_MS = 4_000;

/**
 * Full-screen generating overlay — rotating status messages over a
 * 10-second generation state while the Step 1 API seam runs.
 */
export function GeneratingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  // Cycle status messages
  useEffect(() => {
    const id = setInterval(
      () => setMessageIndex((i) => (i + 1) % MESSAGES.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, []);

  // Lock body scroll while the overlay is up
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-bg-dark/97 px-6 backdrop-blur-md"
    >
      {/* Decorations */}
      <div
        aria-hidden
        className="texture-dots-dark pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/10 blur-3xl"
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Orbiting wand */}
        <div className="relative flex size-28 items-center justify-center">
          <motion.span
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-accent-primary/50"
          />
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex size-16 items-center justify-center rounded-full bg-accent-primary/15"
          >
            <Wand2 className="size-8 text-accent-primary" aria-hidden />
          </motion.span>
          <motion.span
            aria-hidden
            animate={{
              scale: [0.6, 1.2, 0.6],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-1 top-1 size-2.5 rounded-full bg-accent-primary"
          />
        </div>

        {/* Rotating message */}
        <h3 className="mt-9 min-h-8 font-hindi text-lg font-semibold text-text-light md:text-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={messageIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {MESSAGES[messageIndex]}
            </motion.span>
          </AnimatePresence>
        </h3>

        {/* Progress bar */}
        <div className="mt-7 h-1.5 w-64 overflow-hidden rounded-full bg-text-light/10 md:w-80">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-hover"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: MIN_GENERATION_MS / 1000, ease: "linear" }}
          />
        </div>

        {/* Live note */}
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-text-light/15 bg-text-light/5 px-4 py-1.5 text-xs font-medium text-text-light/60">
          <Info className="size-3.5 text-accent-primary" aria-hidden />
          Gemini se asli script ban rahi hai — ye tab mat band karein
        </p>
      </div>
    </motion.div>
  );
}
