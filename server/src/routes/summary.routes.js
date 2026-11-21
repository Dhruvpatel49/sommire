import { Router } from 'express';
import {
  uploadAndGenerateSummary,
  getUserSummaries,
  getSummaryById,
  deleteSummary,
  storeSummary,
} from '../controllers/summary.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { uploadPdfMiddleware } from '../middleware/upload.middleware.js';
import { validate } from '../middleware/validator.middleware.js';
import { storeSummarySchema } from '../validators/summary.validator.js';

const router = Router();

// All summary routes require authentication
router.use(authenticate);

router.post('/upload-and-generate', uploadPdfMiddleware, uploadAndGenerateSummary);
router.post('/store', validate(storeSummarySchema), storeSummary);
router.get('/', getUserSummaries);
router.get('/:id', getSummaryById);
router.delete('/:id', deleteSummary);

export default router;
