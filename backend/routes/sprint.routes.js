import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import SprintController from '../controllers/sprint.controller.js';

const router = express.Router();

// GET /api/projects/:projectId/sprints – получить спринты проекта
// POST /api/projects/:projectId/sprints – создать спринт
router.get('/projects/:projectId/sprints', protect, SprintController.getProjectSprints);
router.post('/projects/:projectId/sprints', protect, SprintController.createSprint);

// PUT /api/sprints/:id – обновить спринт
// POST /api/sprints/:id/start – начать спринт
// POST /api/sprints/:id/complete – завершить спринт
router.put('/sprints/:id', protect, SprintController.updateSprint);
router.post('/sprints/:id/start', protect, SprintController.startSprint);
router.post('/sprints/:id/complete', protect, SprintController.completeSprint);

export default router;