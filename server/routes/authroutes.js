import express from 'express';
const router = express.Router();
import { registerController } from '../controller/authcontroller';
router.post('/signup',registerController);

