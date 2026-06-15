import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import ProfileController from '../controllers/profile.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/me', protect, ProfileController.getProfile);
router.put('/me', protect, ProfileController.updateProfile);

//router.get('/search/teachers', protect, UserController.searchTeachers);
router.get('/search', protect, UserController.searchUsers);

export default router;