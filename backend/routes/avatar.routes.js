import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { uploadAvatar } from '../middleware/upload.middleware.js';
import AvatarController from '../controllers/avatar.controller.js';

const router = express.Router();

router.post('/avatar', protect, uploadAvatar, AvatarController.uploadAvatar);

export default router;