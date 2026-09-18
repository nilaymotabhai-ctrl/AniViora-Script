import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  show: boolean;
  title: string;
  message?: string;
}

/**
 * Lightweight success toast — fixed top-right, auto-managed by the
 * parent (show/hide state + timeout). Used by forms until Part 8.
 */
export function Toast({ show, title, message }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-5 top-24 z-[80] flex max-w-sm items-start gap-3 rounded-2xl border border-success/30 bg-bg-card p-4 shadow-card-hover sm:right-6"
        >
          <CheckCircle2
            className="mt-0.5 size-5 shrink-0 text-success"
            aria-hidden
          />
          <span>
            <span className="block text-sm font-bold text-text-primary">
              {title}
            </span>
            {message && (
              <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                {message}
              </span>
            )}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
