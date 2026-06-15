import SprintService from '../services/sprint.service.js';

class SprintController {
    async createSprint(req, res, next) {
        try {
            const { projectId } = req.params;
            const sprint = await SprintService.createSprint(projectId, req.body);
            res.status(201).json(sprint);
        } catch (err) {
            next(err);
        }
    }

    async getProjectSprints(req, res, next) {
        try {
            const { projectId } = req.params;
            const sprints = await SprintService.getProjectSprints(projectId);
            res.json(sprints);
        } catch (err) {
            next(err);
        }
    }

    async updateSprint(req, res, next) {
        try {
            const { id } = req.params;
            const sprint = await SprintService.updateSprint(id, req.body);
            res.json(sprint);
        } catch (err) {
            next(err);
        }
    }

    async startSprint(req, res, next) {
        try {
            const { id } = req.params;
            const sprint = await SprintService.startSprint(id);
            res.json(sprint);
        } catch (err) {
            next(err);
        }
    }

    async completeSprint(req, res, next) {
        try {
            const { id } = req.params;
            const sprint = await SprintService.completeSprint(id);
            res.json(sprint);
        } catch (err) {
            next(err);
        }
    }
}

export default new SprintController();