import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Extract text directly from a PDF Buffer
 * @param {Buffer} buffer
 * @returns {Promise<string>}
 */
export async function extractTextFromBuffer(buffer) {
  try {
    const data = await pdfParse(buffer);
    const text = data.text ? data.text.trim() : '';

    if (!text || text.length === 0) {
      throw ApiError.badRequest('Unable to extract text from the PDF. The file may be empty or contain only scanned images without OCR.');
    }

    return text;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error('[PDF Service] Buffer extraction error:', error);
    throw ApiError.badRequest(`Failed to parse PDF document: ${error.message}`);
  }
}

/**
 * Extract text from a remote PDF URL (e.g. Cloudinary URL)
 * @param {string} fileUrl
 * @returns {Promise<string>}
 */
export async function extractTextFromUrl(fileUrl) {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw ApiError.badRequest(`Failed to fetch PDF from URL (Status ${response.status})`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return await extractTextFromBuffer(buffer);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error('[PDF Service] URL extraction error:', error);
    throw ApiError.internal(`Failed to extract text from PDF URL: ${error.message}`);
  }
}
