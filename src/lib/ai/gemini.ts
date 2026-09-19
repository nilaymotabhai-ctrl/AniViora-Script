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

export function isGeminiConfigured(): boolean {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  return Boolean(apiKey && apiKey !== 'your_key_here' && apiKey.trim() !== '' && !apiKey.includes('your_key'));
}

export async function generateStory(formData: any) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_key_here' || apiKey.includes('your_key')) {
    throw new Error('API Key Vercel mein connected nahi hai. Kripya Vercel Environment Variables mein VITE_GEMINI_API_KEY verify karke REDEPLOY karein.');
  }

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

  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
  let lastError = '';

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: MASTER_SYSTEM_PROMPT }] },
            contents: [{ parts: [{ text: userPrompt }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 8192 }
          })
        }
      );

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }

      if (data.error) {
        lastError = data.error.message || JSON.stringify(data.error);
      }
    } catch (err: any) {
      lastError = err?.message || 'Network error';
    }
  }

  throw new Error(`Google API Error: ${lastError || 'Failed to generate story'}`);
}
