import express from 'express';
import { getPersonalMessages, sendPersonalMessage } from '../controller/personalchat';
import { requiresLogin } from '../middleware/auth';
const router = express.Router();
router.use(requiresLogin);
router.post('/sendpersonal',sendPersonalMessage);
router.get('/getpersonal/:chatwithId',getPersonalMessages);

