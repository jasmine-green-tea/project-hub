import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import ProfileController from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/me', protect, ProfileController.getProfile);
router.put('/me', protect, ProfileController.updateProfile);

export default router;