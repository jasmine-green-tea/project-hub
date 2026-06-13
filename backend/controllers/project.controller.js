import ProjectService from '../services/project.service.js';

class ProjectController {
    async createProject(req, res, next) {
        console.log('ProjectController.createProject Request body:', req.body);
        try {
            const project = await ProjectService.createProject(req.user.id, req.body);
            res.status(201).json(project);
        } catch (err) {
            next(err);
        }
    }

    async getUserProjects(req, res, next) {
        try {
            const projects = await ProjectService.getUserProjects(req.user.id, req.user.role);
            res.json(projects);
        } catch (err) {
            next(err);
        }
    }

    async getProjectById(req, res, next) {
        try {
            const project = await ProjectService.getProjectById(req.params.id);
            if (!project) return res.status(404).json({ message: 'Project not found' });
            res.json(project);
        } catch (err) {
            next(err);
        }
    }
}

export default new ProjectController();