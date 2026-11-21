import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    // Attempt database connection if URI configured
    if (process.env.MONGODB_URI) {
      await connectDB();
    } else {
      console.warn('[Server Warning] MONGODB_URI is not set. Database operations will fail until configured.');
    }

    app.listen(PORT, () => {
      console.log(`=========================================`);
      console.log(`🚀 Sommaire Server running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
      console.log(`=========================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
