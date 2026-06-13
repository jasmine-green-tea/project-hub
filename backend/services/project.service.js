import ProjectRepository from '../repositories/project.repository.js';
import ProjectMemberRepository from '../repositories/projectMember.repository.js';

class ProjectService {
    async createProject(userId, projectData) {
        const project = await ProjectRepository.create({
            ...projectData,
            created_by: userId,
        });
        // Добавляем создателя как участника
        await ProjectMemberRepository.addMember(project.id, userId);
        return project;
    }

    async getUserProjects(userId, role) {
        const projects = await ProjectRepository.findAllForUser(userId, role);
        // Можно вычислить прогресс (процент выполненных задач) – пока 0
        return projects.map(p => ({ ...p.toJSON(), progress: 0 }));
    }

    async getProjectById(projectId) {
        return await ProjectRepository.findById(projectId);
    }
}

export default new ProjectService();