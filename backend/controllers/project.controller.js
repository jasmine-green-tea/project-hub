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

    async updateProject(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            // Дополнительно: проверить, что пользователь является участником проекта
            const updated = await ProjectService.updateProject(id, updateData);
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }

    // async addMember(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         const { userId } = req.body;
    //         const result = await ProjectService.addMember(id, userId);
    //         res.json(result);
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    async addMembers(req, res, next) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            console.log('ProjectController.addMembers req.body: ', req.body, ', userId: ', userId);
            if (!Array.isArray(userId) || userId.length === 0) {
                return res.status(400).json({ message: 'userIds must be a non-empty array' });
            }
            await ProjectService.addMembers(id, userId);
            res.json({ message: 'Members added successfully' });
        } catch (err) {
            next(err);
        }
    }
}

export default new ProjectController();