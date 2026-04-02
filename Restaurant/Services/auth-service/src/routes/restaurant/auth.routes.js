import {Router} from 'express';
import {register, login, logout, regenerateAccessToken, getUser} from '../../controllers/authController.js';
import { verifyJWT } from '../../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(verifyJWT, logout);
router.route('/regenerate-access-token').post( regenerateAccessToken );
router.route('/get-user').get( verifyJWT, getUser );

export default router;