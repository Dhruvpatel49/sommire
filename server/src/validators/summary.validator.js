import { z } from 'zod';

export const storeSummarySchema = z.object({
  fileUrl: z
    .string({ required_error: 'fileUrl is required' })
    .url('fileUrl must be a valid URL'),
  summary: z
    .string({ required_error: 'summary is required' })
    .min(10, 'summary must be at least 10 characters'),
  title: z
    .string({ required_error: 'title is required' })
    .min(1, 'title is required'),
  fileName: z
    .string({ required_error: 'fileName is required' })
    .min(1, 'fileName is required'),
  cloudinaryPublicId: z.string().optional(),
});
