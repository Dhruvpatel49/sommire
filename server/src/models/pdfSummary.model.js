import mongoose from 'mongoose';

const pdfSummarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    originalFileUrl: {
      type: String,
      required: [true, 'Original file URL is required'],
      trim: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: '',
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary text is required'],
    },
    status: {
      type: String,
      enum: ['processing', 'completed', 'failed'],
      default: 'completed',
    },
    wordCount: {
      type: Number,
      default: 0,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString();
        // Provide compatibility with the original component field names
        ret.original_file_url = ret.originalFileUrl;
        ret.file_name = ret.fileName;
        ret.user_id = ret.userId ? ret.userId.toString() : '';
        ret.created_at = ret.createdAt;
        ret.updated_at = ret.updatedAt;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

pdfSummarySchema.index({ userId: 1, createdAt: -1 });

export const PdfSummary = mongoose.model('PdfSummary', pdfSummarySchema);
