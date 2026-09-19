/**
 * AniViora Craft — Gemini AI client (6-part engine).
 *
 * Uses the NEW @google/genai SDK (v1 endpoint by default) which supports
 * current model aliases. The old @google/generative-ai SDK defaulted to
 * v1beta where most 1.5 aliases now return 404.
 */
import { GoogleGenAI } from "@google/genai";
import { PROMPT_IDENTITY } from "@/lib/ai/prompt-part1-identity";
import { PROMPT_STRUCTURE } from "@/lib/ai/prompt-part2-structure";
import { PROMPT_CHARACTERS_MAGIC } from "@/lib/ai/prompt-part3-characters";
import { PROMPT_NARRATIVE_DIALOGUE } from "@/lib/ai/prompt-part4-narrative";
import { PROMPT_RETENTION_PAYOFF } from "@/lib/ai/prompt-part5-retention";
import { PROMPT_SAFETY_OUTPUT } from "@/lib/ai/prompt-part6-safety-output";

/* ---------- Master system instruction (all 6 parts combined) ---------- */

export const MASTER_SYSTEM_PROMPT = [
  PROMPT_IDENTITY,
  PROMPT_STRUCTURE,
  PROMPT_CHARACTERS_MAGIC,
  PROMPT_NARRATIVE_DIALOGUE,
  PROMPT_RETENTION_PAYOFF,
  PROMPT_SAFETY_OUTPUT,
].join("\n\n---\n\n");

/* ---------- Types ---------- */

export interface StoryRequest {
  genre?: string | null;
  setting?: string | null;
  timePeriod?: string | null;
  length?: string | null;
  supernatural?: string | null;
  theme?: string | null;
  customInstructions?: string | null;
}

/* ---------- Model fallback chain ---------- */

/**
 * Tried in order — first success wins. These are the model IDs that are
 * confirmed active on the v1 endpoint as of mid-2026. If one returns a
 * 404 or any other error the loop moves to the next candidate.
 */
const MODEL_CANDIDATES = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash-002",
  "gemini-1.5-pro-002",
  "gemini-1.5-flash-8b",
] as const;

/* ---------- Helpers ---------- */

function readApiKey(): string | null {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return typeof key === "string" && key.trim() ? key.trim() : null;
}

/** True when VITE_GEMINI_API_KEY is present (UI checks before calling). */
export function isGeminiConfigured(): boolean {
  return readApiKey() !== null;
}

function buildUserPrompt(req: StoryRequest): string {
  return [
    "Create a COMPLETE Hindi 2D animation YouTube script from these selections:",
    "",
    `Genre: ${req.genre ?? "Mystery"}`,
    `Setting: ${req.setting ?? "Gaon"}`,
    `Time Period: ${req.timePeriod ?? "Modern Village"}`,
    `Script Length: ${req.length ?? "35-41 min"}`,
    `Supernatural Element: ${req.supernatural ?? "None"}`,
    `Core Theme: ${req.theme ?? "Laalach"}`,
    `Custom Instructions: ${req.customInstructions?.trim() || "None"}`,
    "",
    "Follow the LENGTH ENGINE for the selected duration and the FINAL SCRIPT FORMAT (STRICT).",
    "Output ONLY the final script — no explanations, no English commentary, no markdown code fences.",
    "Language: सरल बोलचाल की Hindi with Bundeli warmth.",
  ].join("\n");
}

/* ---------- Main export ---------- */

/**
 * Generate a Hindi animation script using the 6-part engine.
 * Walks the model fallback chain until one succeeds.
 */
export async function generateStory(req: StoryRequest): Promise<string> {
  const apiKey = readApiKey();
  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY add nahi hai. .env file (ya deployment env variables) mein key set karke dobara try karein."
    );
  }

  /* @google/genai uses v1 endpoint by default — no more v1beta 404s. */
  const ai = new GoogleGenAI({ apiKey });
  const userPrompt = buildUserPrompt(req);

  let lastError: unknown = new Error("All Gemini model candidates failed.");

  for (const modelName of MODEL_CANDIDATES) {
    try {
      console.log(`[AniViora Craft] Trying model: ${modelName}`);

      const response = await ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: MASTER_SYSTEM_PROMPT,
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      });

      const text = response.text ?? "";
      if (!text.trim()) {
        throw new Error(`Empty response from ${modelName}`);
      }

      console.log(`[AniViora Craft] Success with model: ${modelName}`);
      return text;
    } catch (error) {
      console.warn(
        `[AniViora Craft] Model "${modelName}" failed — trying next…`,
        error instanceof Error ? error.message : error
      );
      lastError = error;
    }
  }

  console.error("[AniViora Craft] All model candidates exhausted.", lastError);
  throw lastError instanceof Error
    ? lastError
    : new Error("Script generate nahi ho payi. Please try again.");
}
