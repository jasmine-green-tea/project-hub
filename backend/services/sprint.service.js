import SprintRepository from '../repositories/sprint.repository.js';

class SprintService {
    async createSprint(projectId, data) {
        // Проверяем, что нет активного спринта
        // const active = await SprintRepository.getActiveSprint(projectId);
        // if (active && data.status === 'active') {
        //     throw new Error('Cannot create active sprint: another sprint is active');
        // }
        // Автоматически вычисляем номер спринта
        const existing = await SprintRepository.findByProject(projectId);
        const nextNumber = existing.length + 1;
        return await SprintRepository.create({
            ...data,
            project_id: projectId,
            sprint_number: nextNumber,
        });
  }

    async getProjectSprints(projectId) {
        return await SprintRepository.findByProject(projectId);
    }

    async updateSprint(sprintId, updateData) {
        return await SprintRepository.update(sprintId, updateData);
    }

    async startSprint(sprintId) {
        const sprint = await SprintRepository.findById(sprintId);
        if (!sprint) throw new Error('Sprint not found');
        // Завершаем активный спринт, если есть
        const active = await SprintRepository.getActiveSprint(sprint.project_id);
        if (active && active.id !== sprintId) {
            await SprintRepository.update(active.id, { status: 'completed' });
        }
        return await SprintRepository.update(sprintId, { status: 'active' });
    }

    async completeSprint(sprintId) {
        const sprint = await SprintRepository.findById(sprintId);
        if (!sprint) throw new Error('Sprint not found');
        if (sprint.status !== 'active') throw new Error('Only active sprint can be completed');
        return await SprintRepository.update(sprintId, { status: 'completed' });
    }
}

export default new SprintService();