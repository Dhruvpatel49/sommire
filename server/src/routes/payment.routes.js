import { Router } from 'express';
import { getPlans, getPaymentStatus } from '../controllers/payment.controller.js';

const router = Router();

router.get('/plans', getPlans);
router.get('/status', getPaymentStatus);

export default router;
