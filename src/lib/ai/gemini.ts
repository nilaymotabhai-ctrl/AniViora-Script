import { GoogleGenerativeAI } from '@google/generative-ai';

import { PROMPT_IDENTITY } from './prompt-part1-identity';
import { PROMPT_STRUCTURE } from './prompt-part2-structure';
import { PROMPT_CHARACTERS_MAGIC } from './prompt-part3-characters';
import { PROMPT_NARRATIVE_DIALOGUE } from './prompt-part4-narrative';
import { PROMPT_RETENTION_PAYOFF } from './prompt-part5-retention';
import { PROMPT_SAFETY_OUTPUT } from './prompt-part6-safety-output';

const MASTER_SYSTEM_PROMPT = [
  PROMPT_IDENTITY,
  PROMPT_STRUCTURE,
  PROMPT_CHARACTERS_MAGIC,
  PROMPT_NARRATIVE_DIALOGUE,
  PROMPT_RETENTION_PAYOFF,
  PROMPT_SAFETY_OUTPUT
].filter(Boolean).join('\n\n---\n\n');

export async function generateStory(formData: any) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_key_here') {
    throw new Error('Gemini API key configure nahi hui hai. VITE_GEMINI_API_KEY environment variable check karein.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Try 2.0-flash first, then fallback models
  const modelsToTry = [
    'gemini-2.0-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash'
  ];

  const userPrompt = `
=== USER STORY SELECTIONS ===
Genre: ${formData.genre || 'Mystery'}
Setting: ${formData.setting || 'Mahal'}
Time Period: ${formData.timePeriod || 'Madhya Kaal'}
Target Script Length: ${formData.length || '35-41 min'}
Supernatural Element: ${formData.supernatural || 'Shraap'}
Core Theme: ${formData.theme || 'Badla'}
Custom Instructions: ${formData.customInstructions || 'None'}
=============================

Please generate a full, highly detailed Hindi animation script following the Master System Prompt rules.
  `;

  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: MASTER_SYSTEM_PROMPT
      });

      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      const text = response.text();
      if (text && text.trim().length > 0) {
        return text;
      }
    } catch (err) {
      console.warn(`Gemini model ${modelName} failed, trying next fallback...`, err);
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini models failed. Please verify your Gemini API key in Vercel settings.');
}
