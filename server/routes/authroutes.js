import express from 'express';
const router = express.Router();
import { loginController, registerController,logoutController } from '../controller/authcontroller.js';
import { requiresLogin } from '../middleware/auth.js';
router.post('/signup',registerController);
router.post('/login',loginController);
router.use(requiresLogin);
router.post('/logout',logoutController);



export default router;