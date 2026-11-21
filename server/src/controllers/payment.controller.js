import { ApiResponse } from '../utils/apiResponse.js';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for personal use',
    features: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    priceId: '',
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9,
    description: 'Perfect for occasional use',
    features: [
      '20 PDF summaries per month',
      'Faster processing speed',
      'Priority email support',
      'Access to full summary library',
    ],
    priceId: process.env.STRIPE_BASIC_PRICE_ID || '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    description: 'Perfect for professionals and teams',
    features: [
      'Unlimited PDF summaries',
      'Fastest processing speed',
      'Access to full summary library',
      'Team collaboration features',
      'Early access to new features',
    ],
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
  },
];

export async function getPlans(req, res, next) {
  try {
    return ApiResponse.success(res, PLANS, 'Plans retrieved');
  } catch (error) {
    next(error);
  }
}

export async function getPaymentStatus(req, res, next) {
  try {
    const isConfigured = Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);
    return ApiResponse.success(res, {
      status: isConfigured ? 'configured' : 'unconfigured',
      message: isConfigured
        ? 'Stripe integration is active.'
        : 'Payment integration status: The original repository defined static pricing plans and database schema definitions for payments, but lacked active Stripe API routes, webhook listeners, or checkout session generation. Server-side payment models and controllers are prepared to activate whenever STRIPE_SECRET_KEY and price IDs are configured.',
    });
  } catch (error) {
    next(error);
  }
}
