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

// 🧠 SMART AUTOMATIC MODEL FINDER
// Ye Google ke server se live poochhta hai ki abhi kaunse models active hain
async function findWorkingModels(apiKey: string): Promise<string[]> {
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
    console.warn('Auto-model discovery failed, using fallback chain');
  }

  // Fallback active models
  return [
    'gemini-2.0-flash',
    'gemini-1.5-flash-002',
    'gemini-1.5-flash',
    'gemini-1.5-pro-002',
    'gemini-1.5-pro'
  ];
}

export async function generateStory(formData: any) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_key_here' || apiKey.includes('your_key')) {
    throw new Error('API Key Vercel mein connected nahi hai. Kripya Vercel Environment Variables mein VITE_GEMINI_API_KEY verify karke REDEPLOY karein.');
  }

  const cleanKey = apiKey.trim();

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

  // Discover live working models for this API key
  const availableModels = await findWorkingModels(cleanKey);
  let lastErrorMsg = '';

  for (const modelName of availableModels) {
    // Try both v1beta and v1 endpoints dynamically
    const apiEndpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cleanKey}`,
      `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${cleanKey}`
    ];

    for (const endpointUrl of apiEndpoints) {
      try {
        const response = await fetch(endpointUrl, {
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
  }

  throw new Error(`Google Gemini Error: ${lastErrorMsg || 'No active Gemini models responded'}`);
}
