import { GoogleGenAI } from '@google/genai';
import { SUMMARY_SYSTEM_PROMPT } from '../utils/prompts.js';
import { ApiError } from '../utils/apiError.js';

// Candidate models for graceful fallback if one model experiences high demand (503)
const DEFAULT_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
];

/**
 * Generate structured summary using Google Gemini API with automatic retry & model fallback
 * @param {string} pdfText - Extracted text content from the PDF
 * @returns {Promise<string>} - Generated markdown summary
 */
export async function generateSummaryFromGemini(pdfText) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw ApiError.internal(
      'GEMINI_API_KEY is not configured on the server. Please provide a valid Gemini API key in server/.env'
    );
  }

  // Truncate text if too massive to prevent exceeding context window
  const safeText =
    pdfText.length > 30000
      ? pdfText.slice(0, 30000) + '\n\n[Content truncated for summarization...]'
      : pdfText;

  const ai = new GoogleGenAI({ apiKey });

  const configuredModel = process.env.GEMINI_MODEL;
  const modelsToTry = [
    configuredModel,
    ...DEFAULT_MODELS.filter((m) => m !== configuredModel),
  ].filter(Boolean);

  let lastError = null;

  for (const model of modelsToTry) {
    // Attempt up to 2 retries per model with backoff on 503 temporary demand spikes
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[Gemini Service] Requesting summary using model: ${model} (Attempt ${attempt})...`);

        const response = await ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [
                { text: SUMMARY_SYSTEM_PROMPT },
                {
                  text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${safeText}`,
                },
              ],
            },
          ],
          config: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          },
        });

        const summary = response?.text;

        if (summary && summary.trim()) {
          console.log(`[Gemini Service] Successfully generated summary with model: ${model}`);
          return summary.trim();
        }
      } catch (error) {
        lastError = error;
        const is503 = error?.message?.includes('503') || error?.message?.includes('high demand');
        console.warn(`[Gemini Service] Model ${model} attempt ${attempt} warning:`, error.message?.slice(0, 100));

        if (is503 && attempt < 2) {
          // Wait 1.5 seconds before retrying the spike
          console.log('[Gemini Service] Temporary high demand spike detected. Waiting 1.5s to retry...');
          await new Promise((res) => setTimeout(res, 1500));
        } else {
          // Move to next candidate model
          break;
        }
      }
    }
  }

  console.error('[Gemini Service] All models exhausted. Final error:', lastError?.message);
  throw ApiError.internal(`AI summarization is currently busy. Please try again in a few moments.`);
}
