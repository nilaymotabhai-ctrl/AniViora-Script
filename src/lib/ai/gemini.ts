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

// AAPKI ASLI GEMINI API KEY DIRECT CODE MEIN FALLBACK:
const HARDCODED_GEMINI_KEY = 'AIzaSyDMuC6-Yls3wqjpogQ82buJspSpeSPfOgk';

export function isGeminiConfigured(): boolean {
  return true;
}

export async function generateStory(formData: any) {
  // Pehle Vercel env var dekhega, agar nahi mila toh direct aapki key use karega!
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY && !import.meta.env.VITE_GEMINI_API_KEY.includes('your_key')) 
    ? import.meta.env.VITE_GEMINI_API_KEY 
    : HARDCODED_GEMINI_KEY;

  const combinedPrompt = `
SYSTEM INSTRUCTIONS & MASTER RULES:
${MASTER_SYSTEM_PROMPT}

=========================================
USER STORY SELECTIONS:
- Genre: ${formData.genre || 'Mystery'}
- Setting: ${formData.setting || 'Mahal'}
- Time Period: ${formData.timePeriod || 'Madhya Kaal'}
- Target Script Length: ${formData.length || '35-41 min'}
- Supernatural Element: ${formData.supernatural || 'Shraap'}
- Core Theme: ${formData.theme || 'Badla'}
- Custom Instructions: ${formData.customInstructions || 'None'}
=========================================

Please generate a full, highly detailed, viral-ready Hindi animation script now.
  `.trim();

  const endpoints = [
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
  ];

  let errors: string[] = [];

  for (const endpointUrl of endpoints) {
    try {
      const response = await fetch(`${endpointUrl}?key=${apiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: combinedPrompt }]
            }
          ]
        })
      });

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }

      if (data.error) {
        errors.push(`${data.error.code || ''}: ${data.error.message || JSON.stringify(data.error)}`);
      }
    } catch (err: any) {
      errors.push(err?.message || 'Network error');
    }
  }

  throw new Error(`Google Gemini Error: ${errors[0] || 'Failed to generate story'}`);
}
