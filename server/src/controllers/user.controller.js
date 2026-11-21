import { ApiResponse } from '../utils/apiResponse.js';
import { PdfSummary } from '../models/pdfSummary.model.js';

export async function getProfile(req, res, next) {
  try {
    const summaryCount = await PdfSummary.countDocuments({ userId: req.user._id });

    return ApiResponse.success(res, {
      user: req.user,
      stats: {
        totalSummaries: summaryCount,
        uploadLimit: 5,
        remainingUploads: Math.max(0, 5 - summaryCount),
      },
    });
  } catch (error) {
    next(error);
  }
}
