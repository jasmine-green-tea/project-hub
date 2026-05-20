import express from 'express';
import ReferenceController from '../controllers/reference.controller.js';

const router = express.Router();

router.get('/institutes', ReferenceController.getInstitutes);
router.get('/directions', ReferenceController.getDirections);
router.get('/departments', ReferenceController.getDepartments);

export default router;