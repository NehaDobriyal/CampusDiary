
import express from 'express';
import { getPersonalMessages, sendPersonalMessage ,setupchat} from '../controller/personalchat.js';
import { requiresLogin } from '../middleware/auth.js';
const router = express.Router();
router.use(requiresLogin);
router.post('/start-chat/:user1/:user2',setupchat);
router.post('/sendpersonal',sendPersonalMessage);
router.get('/getpersonal',getPersonalMessages);

export default router;
