import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { ApiError } from './utils/apiError.js';
import { ApiResponse } from './utils/apiResponse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration supporting credentials, Vercel deployments, and client URL
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    const isVercel = origin.endsWith('.vercel.app');
    const isWhitelisted = allowedOrigins.includes(origin);
    const isDev = process.env.NODE_ENV === 'development';

    if (isWhitelisted || isVercel || isDev) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Root landing endpoint
app.get('/', (req, res) => {
  return ApiResponse.success(
    res,
    {
      name: 'Sommaire API',
      version: '1.0.0',
      status: 'healthy',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        summaries: '/api/summaries',
        payments: '/api/payments',
      },
    },
    'Welcome to Sommaire API server'
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  return ApiResponse.success(res, { status: 'healthy', timestamp: new Date().toISOString() }, 'Sommaire API is running');
});

// Mount application API routes
app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
  next(ApiError.notFound(`Endpoint ${req.originalUrl} not found`));
});

// Centralized error handler
app.use(errorHandler);

export default app;
