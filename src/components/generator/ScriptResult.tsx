import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AudioLines,
  BadgeCheck,
  Check,
  Copy,
  Download,
  FileDown,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/* ================= Raw script parsing ================= */

type ScriptNode =
  | { kind: "blank" }
  | { kind: "title"; value: string }
  | { kind: "meta"; label: string; value: string }
  | { kind: "subhead"; text: string }
  | { kind: "section"; text: string }
  | { kind: "cue"; text: string }
  | { kind: "narration"; text: string }
  | { kind: "dialogue"; name: string; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "text"; text: string };

const EMOJI_RE = /^\p{Extended_Pictographic}/u;
const META_LABELS = ["GENRE", "DURATION", "SETTING"];

function parseScript(raw: string): ScriptNode[] {
  return raw.split(/\r?\n/).map((line): ScriptNode => {
    const trimmed = line.trim();
    if (!trimmed) return { kind: "blank" };

    // 【 SECTION 】
    if (/^【.+】$/.test(trimmed)) return { kind: "section", text: trimmed };

    // Emoji-led header lines (🎬 TITLE, 📝 GENRE, ⏱️ DURATION, 🎯 MORAL…)
    if (EMOJI_RE.test(trimmed)) {
      const firstSpace = trimmed.search(/\s/);
      const rest = firstSpace === -1 ? "" : trimmed.slice(firstSpace + 1);
      const label = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace);
      const labelWithText = `${label} ${rest}`.replace(/\s+/g, " ").trim();

      if (/TITLE/i.test(rest || label)) {
        const value = (rest || label)
          .replace(/^\p{Extended_Pictographic}\s*/u, "")
          .replace(/^TITLE\s*[:：-]?\s*/i, "");
        return { kind: "title", value: value || "आपकी कहानी" };
      }

      for (const meta of META_LABELS) {
        if (rest.toUpperCase().startsWith(meta)) {
          return {
            kind: "meta",
            label: meta,
            value: rest.replace(new RegExp(`^${meta}\\s*[:：-]?\\s*`, "i"), ""),
          };
        }
      }
      return { kind: "subhead", text: labelWithText };
    }

    // [cue] lines
    if (/^\[.+\]$/.test(trimmed)) return { kind: "cue", text: trimmed };

    // Narrator - …
    const narratorMatch = trimmed.match(/^Narrator\s*[-–:]\s*(.+)$/i);
    if (narratorMatch) return { kind: "narration", text: narratorMatch[1] };

    // Character - dialogue
    const dialogueMatch = trimmed.match(/^([^\s\-–—]{1,3}(?:\s[^\s\-–—]{1,3}){0,2})\s*[-–—]\s*(.+)$/);
    if (dialogueMatch && dialogueMatch[1].length <= 22) {
      return {
        kind: "dialogue",
        name: dialogueMatch[1],
        text: dialogueMatch[2],
      };
    }

    // - bullet
    if (/^[-•]\s+/.test(trimmed)) {
      return { kind: "bullet", text: trimmed.replace(/^[-•]\s+/, "") };
    }

    return { kind: "text", text: trimmed };
  });
}

/* ================= Render pieces ================= */

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mt-9 flex items-center gap-3 first:mt-0">
      <h3 className="font-hindi text-sm font-bold uppercase tracking-[0.18em] text-accent-primary">
        {children}
      </h3>
      <span aria-hidden className="h-px flex-1 bg-border-color" />
    </div>
  );
}

/** Renders one parsed node of the generated script. */
function ScriptLine({ node }: { node: ScriptNode }) {
  switch (node.kind) {
    case "blank":
      return <span aria-hidden className="block h-2" />;
    case "title":
      return null; // rendered in the card header
    case "meta":
      return null; // rendered as chips in the card header
    case "section":
      return <SectionHeading>{node.text}</SectionHeading>;
    case "subhead":
      return (
        <h4 className="font-hindi mt-8 border-b border-border-color pb-2 font-heading text-base font-bold text-text-primary md:text-lg">
          {node.text}
        </h4>
      );
    case "cue":
      return (
        <p className="my-2">
          <span className="font-hindi inline-flex items-center gap-1.5 rounded-full bg-bg-info px-3 py-1 text-xs font-semibold text-accent-hover">
            <AudioLines className="size-3.5" aria-hidden />
            {node.text}
          </span>
        </p>
      );
    case "narration":
      return (
        <p className="font-hindi my-3 border-l-2 border-accent-primary/40 pl-4 text-[0.95rem] italic leading-[1.9] text-text-secondary md:text-base">
          {node.text}
        </p>
      );
    case "dialogue":
      return (
        <p className="font-hindi my-2 text-[0.95rem] leading-[1.85] text-text-primary/90 md:text-base">
          <span className="font-bold text-accent-primary">{node.name}</span>
          <span className="text-text-secondary"> — </span>
          {node.text}
        </p>
      );
    case "bullet":
      return (
        <p className="font-hindi my-1.5 flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-text-primary/90 md:text-base">
          <span
            aria-hidden
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-primary"
          />
          {node.text}
        </p>
      );
    default:
      return (
        <p className="font-hindi my-2 text-[0.95rem] leading-[1.85] text-text-primary/90 md:text-base">
          {node.text}
        </p>
      );
  }
}

/* ================= Component ================= */

interface ScriptResultProps {
  /** Raw text returned by the Gemini engine. */
  scriptText: string;
  /** Reset the wizard back to step 1. */
  onReset: () => void;
}

/**
 * Result screen — renders the real Gemini-generated script with
 * copy / TXT download / WhatsApp share / regenerate actions.
 */
export function ScriptResult({ scriptText, onReset }: ScriptResultProps) {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const nodes = useMemo(() => parseScript(scriptText), [scriptText]);
  const title =
    nodes.find((n) => n.kind === "title")?.value ?? "आपकी कहानी";
  const metaChips = nodes.filter(
    (n): n is Extract<ScriptNode, { kind: "meta" }> => n.kind === "meta"
  );

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = scriptText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([scriptText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aniviora-script-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("TXT download ho gaya! Make something amazing.");
  };

  const shareText = `${title}\n\n${scriptText.slice(0, 650)}…\n\nFREE Hindi AI Script — AniViora Craft`;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-border-color bg-bg-card p-6 shadow-card-hover md:p-10"
    >
      {/* ---------- Header ---------- */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3.5 py-1.5 text-xs font-bold text-success">
          <BadgeCheck className="size-4" aria-hidden />
          Script Ready
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-info px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-hover">
          <Sparkles className="size-3.5" aria-hidden />
          Gemini AI Engine
        </span>
      </div>

      <h2 className="font-hindi mt-5 font-heading text-2xl font-bold leading-snug text-text-primary md:text-h3">
        {title}
      </h2>

      {/* Meta chips */}
      {metaChips.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {metaChips.map((chip) => (
            <li
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border-color bg-bg-primary px-3 py-1.5 text-xs font-semibold text-text-primary"
            >
              <span className="text-[10px] font-bold uppercase tracking-wide text-text-secondary">
                {chip.label}
              </span>
              {chip.value || "—"}
            </li>
          ))}
        </ul>
      )}

      {/* ---------- Actions ---------- */}
      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="size-4 text-success" aria-hidden />
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <Copy className="size-4" aria-hidden />
                Copy to Clipboard
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          type="button"
          onClick={() => showToast("PDF export jald aa raha hai — abhi TXT ya Copy use karein.")}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <FileDown className="size-4" aria-hidden />
          Download PDF
        </button>

        <button
          type="button"
          onClick={handleDownloadTxt}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <Download className="size-4" aria-hidden />
          Download TXT
        </button>

        <a
          href={whatsappShare}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({
            size: "sm",
            className:
              "bg-[#25D366] text-white hover:bg-[#1DA851] shadow-none",
          })}
        >
          <WhatsAppIcon className="size-4" aria-hidden />
          Share on WhatsApp
        </a>

        <button
          type="button"
          onClick={onReset}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <RefreshCw className="size-4" aria-hidden />
          Generate Another
        </button>
      </div>

      {/* ---------- Script display ---------- */}
      <div className="texture-dots mt-8 rounded-2xl border border-border-color bg-bg-primary p-5 md:p-8">
        <div
          className={cn("max-w-none")}
          role="document"
          aria-label="Generated Hindi script"
        >
          {nodes.map((node, i) => (
            <ScriptLine key={i} node={node} />
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary/70">
          — AniViora Craft · Kahaniyan Jahan Zinda Hoti Hain —
        </p>
      </div>

      <Toast
        show={toast !== null}
        title="AniViora Craft"
        message={toast ?? undefined}
      />
    </motion.div>
  );
}
