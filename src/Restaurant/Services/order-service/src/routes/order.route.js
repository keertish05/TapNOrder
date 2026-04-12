import {Router} from 'express';
import { createOrder, confirmOrder, getOrdersForRestaurant, updateOrderStatus, getOrderStatus, getOrderByClientOrderId, getAllOrders } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', createOrder);
router.post('/confirm', confirmOrder);
router.get('/status', getOrderStatus);
router.get('/', verifyJWT, getOrdersForRestaurant);
router.patch('/:id/status', verifyJWT, updateOrderStatus);
router.get('/by-client-order-id', getOrderByClientOrderId);
router.get("/all",  getAllOrders);

export default router;
