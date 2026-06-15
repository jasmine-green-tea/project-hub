import db from '../models/index.js';
import { Op } from 'sequelize';

class SprintRepository {
    async create(data) {
        return await db.Sprint.create(data);
    }

    async findByProject(projectId) {
        return await db.Sprint.findAll({
            where: { project_id: projectId },
            order: [['sprint_number', 'ASC']],
        });
    }

    async findById(id) {
        return await db.Sprint.findByPk(id);
    }

    async update(id, data) {
        const sprint = await db.Sprint.findByPk(id);
        if (!sprint) throw new Error('Sprint not found');
        return await sprint.update(data);
    }

    async delete(id) {
        const sprint = await db.Sprint.findByPk(id);
        if (!sprint) throw new Error('Sprint not found');
        return await sprint.destroy();
    }

    async getActiveSprint(projectId) {
        return await db.Sprint.findOne({
            where: { project_id: projectId, status: 'active' },
        });
  }
}

export default new SprintRepository();