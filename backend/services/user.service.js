import db from '../models/index.js';
import { Op } from 'sequelize';

class UserService {
    async searchTeachers(query) {
        if (!query || query.trim().length < 2) return [];
        return await db.User.findAll({
                where: {
                role: 'teacher',
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { surname: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                ],
                },
                attributes: ['id', 'name', 'surname', 'email', 'avatar_path'],
                limit: 10,
        });
        }

        async searchUsers(query, roleFilter) {
            if (!query || query.trim().length < 2) return [];
            return await db.User.findAll({
                where: {
                role: roleFilter,
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { surname: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                ],
                },
                attributes: ['id', 'name', 'surname', 'email', 'avatar_path'],
                limit: 10,
            });
        }
    }

export default new UserService();