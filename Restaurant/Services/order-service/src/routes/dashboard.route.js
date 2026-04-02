import {Router} from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getDashboardStats,getTopItems, getOrdersByHour, getOrdersTrend } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/stats', verifyJWT, getDashboardStats);
router.get('/top-items', verifyJWT, getTopItems);
router.get('/orders-by-hour', verifyJWT, getOrdersByHour);
router.get('/orders-trend', verifyJWT, getOrdersTrend);

export default router;