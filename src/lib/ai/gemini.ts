import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT_IDENTITY } from "@/lib/ai/prompt-part1-identity";
import { PROMPT_STRUCTURE } from "@/lib/ai/prompt-part2-structure";
import { PROMPT_CHARACTERS_MAGIC } from "@/lib/ai/prompt-part3-characters";
import { PROMPT_NARRATIVE_DIALOGUE } from "@/lib/ai/prompt-part4-narrative";
import { PROMPT_RETENTION_PAYOFF } from "@/lib/ai/prompt-part5-retention";
import { PROMPT_SAFETY_OUTPUT } from "@/lib/ai/prompt-part6-safety-output";

/* ---------- Master system instruction ---------- */

/**
 * All six engine parts combined into one system prompt:
 * identity -> structure -> characters/magic -> narrative/dialogue
 * -> retention/payoff -> safety/output.
 */
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

/* ---------- Config ---------- */

/**
 * Model fallback chain — tries the newest flash tier first and
 * degrades gracefully if a model id isn't available on the key.
 */
const MODEL_CANDIDATES = [
  "gemini-2.0-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
] as const;

function readApiKey(): string | null {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return typeof key === "string" && key.trim() ? key.trim() : null;
}

/** True when VITE_GEMINI_API_KEY is present (UI checks before calling). */
export function isGeminiConfigured(): boolean {
  return readApiKey() !== null;
}

function buildUserPrompt(request: StoryRequest): string {
  return [
    "Create a COMPLETE Hindi 2D animation YouTube script from these selections:",
    "",
    `Genre: ${request.genre ?? "Mystery"}`,
    `Setting: ${request.setting ?? "Gaon"}`,
    `Time Period: ${request.timePeriod ?? "Modern Village"}`,
    `Script Length: ${request.length ?? "35-41 min"}`,
    `Supernatural Element: ${request.supernatural ?? "None"}`,
    `Core Theme: ${request.theme ?? "Laalach"}`,
    `Custom Instructions: ${request.customInstructions?.trim() || "None"}`,
    "",
    "Follow the LENGTH ENGINE for the selected duration and the FINAL SCRIPT FORMAT (STRICT). Output ONLY the final script — no explanations, no English commentary, no markdown code fences. Language: सरल बोलचाल की Hindi with Bundeli warmth.",
  ].join("\n");
}

/* ---------- Generation ---------- */

/**
 * Generate a story with the combined 6-part engine.
 * Uses a fresh client per call (key read from env each time) and
 * walks the model fallback chain on failure.
 */
export async function generateStory(
  formData: StoryRequest
): Promise<string> {
  const apiKey = readApiKey();
  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY add nahi hai. .env file (ya deployment env variables) mein key set karke dobara try karein."
    );
  }

  const ai = new GoogleGenerativeAI(apiKey);
  const userPrompt = buildUserPrompt(formData);

  let lastError: unknown = new Error("Gemini generation failed.");
  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = ai.getGenerativeModel({
        model: modelName,
        systemInstruction: MASTER_SYSTEM_PROMPT,
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      });

      const result = await model.generateContent(userPrompt);
      const text = result.response.text();

      if (!text.trim()) {
        throw new Error(`Empty response from ${modelName}`);
      }
      return text;
    } catch (error) {
      lastError = error;
      // Try the next model candidate.
    }
  }

  console.error(
    "[AniViora Craft] Gemini generation failed on all models:",
    lastError
  );
  throw lastError instanceof Error
    ? lastError
    : new Error("Gemini generation failed. Please try again.");
}
