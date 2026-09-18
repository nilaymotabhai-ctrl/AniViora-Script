import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clapperboard, Download, Share2 } from "lucide-react";

interface ScriptLine {
  speaker: string;
  text: string;
}

const SCRIPT_LINES: ScriptLine[] = [
  { speaker: "राजू", text: "आज हम पुरानी किले का रहस्य सुलझाएँगे!" },
  { speaker: "मीना", text: "पर राजू, वहाँ रात में अजीब आवाज़ें आती हैं…" },
  { speaker: "राजू", text: "डरो मत मीना — दोस्ती से बड़ी कोई ताकत नहीं!" },
  { speaker: "मीना", text: "ठीक है, चलो! आज गाँव वालों को दिखा देंगे!" },
];

/* ---------- Grapheme-safe segmentation (Devanagari matras) ---------- */
type SegFn = (text: string, locale: string) => string[];

const toGraphemes: SegFn = (() => {
  const SegmenterCtor = (
    Intl as unknown as {
      Segmenter?: new (
        locale: string,
        opts: { granularity: "grapheme" }
      ) => { segment(t: string): Iterable<{ segment: string }> };
    }
  ).Segmenter;

  if (SegmenterCtor) {
    return (text, locale) => {
      const seg = new SegmenterCtor(locale, { granularity: "grapheme" });
      return Array.from(seg.segment(text), (s) => s.segment);
    };
  }
  return (text) => Array.from(text);
})();

/* ---------- Typewriter hook ---------- */
function useTypewriter(lines: ScriptLine[], speed = 42, hold = 1600) {
  const graphemes = useMemo(
    () => lines.map((l) => toGraphemes(l.text, "hi")),
    [lines]
  );
  const [state, setState] = useState({ line: 0, count: 0 });

  useEffect(() => {
    const current = graphemes[state.line];
    if (state.count < current.length) {
      const t = setTimeout(
        () => setState((s) => ({ ...s, count: s.count + 1 })),
        speed
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () =>
        setState((s) => ({ line: (s.line + 1) % lines.length, count: 0 })),
      hold
    );
    return () => clearTimeout(t);
  }, [state, graphemes, lines.length, speed, hold]);

  return {
    done: lines.slice(0, state.line),
    active: lines[state.line],
    typed: graphemes[state.line].slice(0, state.count).join(""),
  };
}

/* ---------- Line renderer ---------- */
function DialogueLine({
  speaker,
  text,
  typing = false,
}: {
  speaker: string;
  text: string;
  typing?: boolean;
}) {
  return (
    <p className="font-hindi text-sm leading-relaxed text-text-primary sm:text-[0.95rem]">
      <span className="font-semibold text-accent-primary">{speaker}: </span>
      {text}
      {typing && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1.05em] w-[2.5px] translate-y-[0.18em] animate-pulse rounded-full bg-accent-primary"
        />
      )}
    </p>
  );
}

/**
 * Mock "AI writing a Hindi script" editor card with a live
 * typewriter effect cycling through Devanagari dialogue lines.
 */
export function ScriptPreviewCard() {
  const { done, active, typed } = useTypewriter(SCRIPT_LINES);

  return (
    <div className="overflow-hidden rounded-2xl border border-border-color bg-bg-card shadow-card-hover">
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-border-color bg-bg-info px-4 py-3">
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-error/70" />
          <span className="size-2.5 rounded-full bg-accent-primary/70" />
          <span className="size-2.5 rounded-full bg-success/70" />
        </span>
        <span className="font-hindi truncate text-xs font-medium text-text-secondary">
          गाँव-की-कहानी · EP01.script
        </span>
        <span className="font-hindi rounded-full bg-bg-dark px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-text-light">
          हिंदी
        </span>
      </div>

      {/* Script body */}
      <div className="min-h-[248px] px-5 py-5 sm:min-h-[260px]">
        {/* Scene heading */}
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent-hover">
            <Clapperboard className="size-3.5" aria-hidden />
            दृश 12
          </span>
          <span className="h-px flex-1 bg-border-color" aria-hidden />
        </div>
        <p className="font-hindi mb-4 text-xs italic leading-relaxed text-text-secondary">
          (किले के अंदर — रात का समय। मोमबत्ती की रोशनी में राजू और मीना पुराना
          नक्शा देख रहे हैं।)
        </p>

        {/* Dialogue — completed lines + actively typing line */}
        <div className="space-y-2.5">
          {done.map((line, i) => (
            <motion.div
              key={`${line.speaker}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <DialogueLine speaker={line.speaker} text={line.text} />
            </motion.div>
          ))}
          <DialogueLine speaker={active.speaker} text={typed} typing />
        </div>
      </div>

      {/* Footer toolbar */}
      <div className="flex items-center justify-between border-t border-border-color bg-bg-primary/60 px-5 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
          35–41 min runtime
        </span>
        <span className="flex items-center gap-1.5 text-text-secondary">
          <Download
            className="size-4 transition-colors hover:text-accent-primary"
            aria-label="Download (coming soon)"
          />
          <Share2
            className="size-4 transition-colors hover:text-accent-primary"
            aria-label="Share (coming soon)"
          />
        </span>
      </div>
    </div>
  );
}
