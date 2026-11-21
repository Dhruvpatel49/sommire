import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '../../uploads');

/**
 * Upload a PDF buffer to Cloudinary with local storage fallback
 */
export async function uploadPdfToCloudinary(buffer, originalName) {
  // Try Cloudinary when credentials are configured
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    try {
      const cleanName = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      const publicId = `sommaire/pdfs/${Date.now()}_${cleanName}`;

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            public_id: publicId,
            folder: 'sommaire/pdfs',
          },
          (error, res) => {
            if (error) return reject(error);
            resolve(res);
          }
        );
        uploadStream.end(buffer);
      });

      if (result?.secure_url) {
        return {
          secure_url: result.secure_url,
          public_id: result.public_id,
        };
      }
    } catch (error) {
      console.warn('[Storage] Cloudinary upload failed, falling back to local storage:', error.message || error);
    }
  }

  // 2. Resilient local fallback
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const safeName = `${Date.now()}_${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const filePath = path.join(UPLOADS_DIR, safeName);
  await fs.writeFile(filePath, buffer);

  const port = process.env.PORT || 5000;
  const fileUrl = `http://localhost:${port}/uploads/${safeName}`;

  console.log(`[Storage] Stored file locally: ${fileUrl}`);

  return {
    secure_url: fileUrl,
    public_id: safeName,
  };
}

/**
 * Delete a file from Cloudinary or local storage
 */
export async function deleteFromCloudinary(publicId) {
  if (!publicId) return;

  try {
    if (publicId.startsWith('sommaire/')) {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    } else {
      // Local file
      const filePath = path.join(UPLOADS_DIR, publicId);
      await fs.unlink(filePath).catch(() => {});
    }
  } catch (error) {
    console.error('[Storage] Delete error:', error.message);
  }
}
