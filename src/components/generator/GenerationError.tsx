import { motion } from "framer-motion";
import { RefreshCw, Settings2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GenerationErrorProps {
  message: string;
  /** Retry generation with the same selections. */
  onRetry: () => void;
  /** Go back to the wizard (selections preserved). */
  onEdit: () => void;
}

/** Friendly blocking error for the generator (missing key / API failure). */
export function GenerationError({
  message,
  onRetry,
  onEdit,
}: GenerationErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-error/30 bg-error/[0.04] p-8 shadow-card md:p-10"
      role="alert"
    >
      <div className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-error/12 text-error">
          <TriangleAlert className="size-8" strokeWidth={1.75} aria-hidden />
        </span>
        <h2 className="mt-5 font-heading text-h3 font-semibold text-text-primary">
          Script generate nahi ho payi
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary md:text-base">
          {message}
        </p>
        <p className="mt-3 max-w-lg text-xs leading-relaxed text-text-secondary/80">
          Tip: key set karne ke baad development server restart karein.
          Production mein key env variables mein add karein.
        </p>
        <code className="mt-4 rounded-xl border border-border-color bg-bg-dark px-4 py-2.5 text-xs font-semibold text-text-light">
          VITE_GEMINI_API_KEY=your_key_here
        </code>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={onRetry}>
            <RefreshCw className="size-4" aria-hidden />
            Try Again
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Settings2 className="size-4" aria-hidden />
            Edit Selections
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
