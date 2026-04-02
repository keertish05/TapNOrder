import {Router} from 'express';
import { createOrder, confirmOrder, getOrdersForRestaurant, updateOrderStatus, getOrderStatus } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', createOrder);
router.post('/confirm', confirmOrder);
router.get('/status', getOrderStatus);
router.get('/', verifyJWT, getOrdersForRestaurant);
router.patch('/:id/status', verifyJWT, updateOrderStatus);

export default router;
