import express from 'express';
import { requiresLogin } from '../middleware/auth';
const router =  express.Router();

router.use(requiresLogin);

router.get('/profile',getprofile);
router.post('/updateprofile',updateprofile);
router.get('/profile/:id',getnewprofile);