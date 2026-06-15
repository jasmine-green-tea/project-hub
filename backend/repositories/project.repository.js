import db from '../models/index.js';
import { Op } from 'sequelize';

class ProjectRepository {
    async create(data) {
        return await db.Project.create(data);
    }

    async findAllForUser(userId, role) {
        const projects = await db.Project.findAll({
            where: {
                [Op.or]: [
                    { created_by: userId },
                    { id: { [Op.in]: db.sequelize.literal(`(SELECT project_id FROM project_members WHERE user_id = ${userId})`) } }
                ]
            },
            include: [
                { model: db.Institute, as: 'institute' },
                { model: db.Direction, as: 'direction' }
                // НЕ включаем members, чтобы избежать конфликта ассоциаций
            ],
            order: [['created_at', 'DESC']],
        });
        return projects;
    }

    async findById(id) {
        return await db.Project.findByPk(id, {
            include: [
                { model: db.Institute, as: 'institute' },
                { model: db.Direction, as: 'direction' },
                { model: db.User, as: 'creator', attributes: ['id', 'name', 'surname'] },
                { model: db.User,
                    as: 'members',
                    attributes: ['id', 'name', 'surname', 'email', 'avatar_path', 'role']
                },
            ],
        });
    }

    async update(id, data) {
        const project = await db.Project.findByPk(id);
        if (!project) throw new Error('Project not found');
        return await project.update(data);
    }
}

export default new ProjectRepository();