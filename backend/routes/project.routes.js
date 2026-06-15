import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import ProjectController from '../controllers/project.controller.js';

const router = express.Router();

router.post('/', protect, ProjectController.createProject);
router.get('/', protect, ProjectController.getUserProjects);
router.get('/:id', protect, ProjectController.getProjectById);
router.put('/:id', protect, ProjectController.updateProject);
//router.post('/:id/members', protect, ProjectController.addMember);
router.post('/:id/members', protect, ProjectController.addMembers);

export default router;