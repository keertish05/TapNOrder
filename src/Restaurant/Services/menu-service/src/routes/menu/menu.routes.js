import {Router} from 'express';
import { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem, getMenuByRestaurant,createDish,getDishesByRestaurant } from '../../controllers/menu.controller.js';
import { verifyJWT } from '../../middlewares/auth.middleware.js';
import { upload } from '../../middlewares/multer.middleware.js';

const router = Router();

router.post('/', verifyJWT, upload.single('image'), createMenuItem);
router.get('/', verifyJWT, getMenuItems);
router.put('/:id', verifyJWT, upload.single('image'), updateMenuItem);
router.delete('/:id', verifyJWT, deleteMenuItem);
router.get('/restaurant/:restaurantId', getMenuByRestaurant);
router.post('/dish', verifyJWT, upload.single('image'), createDish);
router.get('/dish/restaurant/:restaurantId', getDishesByRestaurant);

export default router;
