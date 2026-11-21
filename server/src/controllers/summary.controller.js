import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { PdfSummary } from '../models/pdfSummary.model.js';
import { uploadPdfToCloudinary, deleteFromCloudinary } from '../services/cloudinary.service.js';
import { extractTextFromBuffer, extractTextFromUrl } from '../services/pdf.service.js';
import { generateSummaryFromGemini } from '../services/gemini.service.js';
import { formatFileNameAsTitle } from '../utils/formatUtils.js';

/**
 * Handle end-to-end PDF upload, extraction, Gemini summarization, and MongoDB storage
 */
export async function uploadAndGenerateSummary(req, res, next) {
  try {
    if (!req.file) {
      throw ApiError.badRequest('Please upload a valid PDF file');
    }

    const { originalname, buffer, size } = req.file;

    // Step 1: Upload PDF to Cloudinary
    console.log(`[Summary Controller] Uploading "${originalname}" to Cloudinary...`);
    const { secure_url, public_id } = await uploadPdfToCloudinary(buffer, originalname);

    // Step 2: Extract text from PDF buffer
    console.log(`[Summary Controller] Extracting text from "${originalname}"...`);
    const pdfText = await extractTextFromBuffer(buffer);

    // Step 3: Generate structured summary using Google Gemini
    console.log(`[Summary Controller] Calling Gemini API for summarization...`);
    const summary = await generateSummaryFromGemini(pdfText);

    // Step 4: Format title and count words
    const title = formatFileNameAsTitle(originalname);
    const wordCount = summary.trim().split(/\s+/).length;

    // Step 5: Save in MongoDB
    const pdfSummary = await PdfSummary.create({
      userId: req.user._id,
      originalFileUrl: secure_url,
      cloudinaryPublicId: public_id,
      fileName: originalname,
      title,
      summary,
      status: 'completed',
      wordCount,
      fileSize: size,
    });

    console.log(`[Summary Controller] Summary created with ID: ${pdfSummary._id}`);

    return ApiResponse.created(
      res,
      pdfSummary,
      'Summary generated and saved successfully'
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Get all summaries belonging to the authenticated user
 */
export async function getUserSummaries(req, res, next) {
  try {
    const summaries = await PdfSummary.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    // Map to ensure both camelCase and snake_case properties are available
    const formatted = summaries.map((s) => ({
      ...s,
      id: s._id.toString(),
      original_file_url: s.originalFileUrl,
      file_name: s.fileName,
      created_at: s.createdAt,
      updated_at: s.updatedAt,
    }));

    return ApiResponse.success(res, formatted, 'Summaries retrieved');
  } catch (error) {
    next(error);
  }
}

/**
 * Get single summary by ID (ensuring ownership)
 */
export async function getSummaryById(req, res, next) {
  try {
    const { id } = req.params;

    const summary = await PdfSummary.findById(id);

    if (!summary) {
      throw ApiError.notFound('Summary not found');
    }

    // Ownership check
    if (summary.userId.toString() !== req.user._id.toString()) {
      throw ApiError.forbidden('You do not have permission to view this summary');
    }

    const json = summary.toJSON();

    return ApiResponse.success(res, json, 'Summary retrieved');
  } catch (error) {
    next(error);
  }
}

/**
 * Delete summary by ID (ensuring ownership) and remove Cloudinary asset
 */
export async function deleteSummary(req, res, next) {
  try {
    const { id } = req.params;

    const summary = await PdfSummary.findById(id);

    if (!summary) {
      throw ApiError.notFound('Summary not found');
    }

    if (summary.userId.toString() !== req.user._id.toString()) {
      throw ApiError.forbidden('You do not have permission to delete this summary');
    }

    // Delete from Cloudinary if stored
    if (summary.cloudinaryPublicId) {
      await deleteFromCloudinary(summary.cloudinaryPublicId);
    }

    await PdfSummary.findByIdAndDelete(id);

    return ApiResponse.success(res, { id }, 'Summary deleted successfully');
  } catch (error) {
    next(error);
  }
}

/**
 * Store an existing summary (for modular workflows)
 */
export async function storeSummary(req, res, next) {
  try {
    const { fileUrl, summary, title, fileName, cloudinaryPublicId } = req.body;

    const wordCount = summary.trim().split(/\s+/).length;

    const savedSummary = await PdfSummary.create({
      userId: req.user._id,
      originalFileUrl: fileUrl,
      cloudinaryPublicId: cloudinaryPublicId || '',
      fileName,
      title: title || formatFileNameAsTitle(fileName),
      summary,
      status: 'completed',
      wordCount,
    });

    return ApiResponse.created(
      res,
      savedSummary,
      'PDF summary saved successfully'
    );
  } catch (error) {
    next(error);
  }
}
