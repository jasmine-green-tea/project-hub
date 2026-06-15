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

    async updateProject(projectId, updateData) {
        const project = await ProjectRepository.update(projectId, updateData);
        return project;
    }

    // async addMember(projectId, userId) {
    //     const user = await UserRepository.findById(userId);
    //     if (!user) throw new Error('User not found');
    //     if (user.role !== 'teacher') throw new Error('Only teachers can be added as members'); // опционально
    //     const existing = await ProjectMemberRepository.isMember(projectId, userId);
    //     if (existing) throw new Error('User already in project');
    //     return await ProjectMemberRepository.addMember(projectId, userId);
    // }

    async addMembers(projectId, userIds) {
        // Опционально: добавить проверку существования пользователей и их роли
        return await ProjectMemberRepository.addMembers(projectId, userIds);
    }
}

export default new ProjectService();