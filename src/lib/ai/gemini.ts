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

const HARDCODED_GEMINI_KEY = 'AIzaSyDMuC6-Yls3wqjpogQ82buJspSpeSPfOgk';

export function isGeminiConfigured(): boolean {
  return true;
}

// Smart function to automatically find an active working Gemini model for this API key
async function findWorkingModelName(apiKey: string): Promise<string[]> {
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const listData = await listRes.json();
    
    if (listData.models && Array.isArray(listData.models)) {
      const activeModels = listData.models
        .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m: any) => m.name.replace('models/', ''));
      
      if (activeModels.length > 0) {
        return activeModels;
      }
    }
  } catch (e) {
    console.warn('Could not auto-list models, falling back to default list');
  }

  return [
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash-8b',
    'gemini-1.5-pro'
  ];
}

export async function generateStory(formData: any) {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY && !import.meta.env.VITE_GEMINI_API_KEY.includes('your_key')) 
    ? import.meta.env.VITE_GEMINI_API_KEY.trim()
    : HARDCODED_GEMINI_KEY.trim();

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

  // Dynamically discover models supported by this specific API Key
  const modelsToTry = await findWorkingModelName(apiKey);
  let lastErrorMsg = '';

  for (const modelName of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: combinedPrompt }] }]
        })
      });

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }

      if (data.error) {
        lastErrorMsg = `${modelName}: ${data.error.message || JSON.stringify(data.error)}`;
      }
    } catch (err: any) {
      lastErrorMsg = err?.message || 'Network error';
    }
  }

  throw new Error(`Google API Error: ${lastErrorMsg || 'No active Gemini models responded'}`);
}
