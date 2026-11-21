import multer from 'multer';
import { ApiError } from '../utils/apiError.js';

// Memory storage keeps file buffer in memory for direct stream to Cloudinary and PDF extraction
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(ApiError.badRequest('Only PDF files are supported'), false);
  }
};

export const uploadPdfMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max size
  },
}).single('file');
