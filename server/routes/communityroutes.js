import express from 'express';
import { getMessages,sendMessage } from '../controller/communitycontroller';
import { requiresLogin } from '../middleware/auth';
const router = express.Router();
router.use(requiresLogin);
router.post('/sendMessage', sendMessage);
router.get('/getMessages/:chatid', getMessages);

export default router;