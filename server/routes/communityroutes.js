import express from 'express';
import { createGroup, getMessages,sendMessage } from '../controller/communitycontroller.js';
import { requiresLogin } from '../middleware/auth.js';
const router = express.Router();

//router.post('/adduniversity',createGroup);
router.use(requiresLogin);
router.post('/sendMessage', sendMessage);
router.get('/getMessages/:roomid', getMessages);

export default router;