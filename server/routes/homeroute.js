import express from 'express';
import { requiresLogin } from '../middleware/auth';

const router  = express.Router();

router.use(requiresLogin);
router.get('/allusers',getallusers);