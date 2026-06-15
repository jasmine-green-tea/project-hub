import UserService from '../services/user.service.js';

class UserController {
    async searchTeachers(req, res, next) {
        try {
            const { q } = req.query;
            const users = await UserService.searchTeachers(q);
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async searchUsers(req, res, next) {
        try {
            const { q, role } = req.query;
            if (!role || !['student', 'teacher'].includes(role)) {
                return res.status(400).json({ message: 'Invalid role' });
            }
            const users = await UserService.searchUsers(q, role);
            res.json(users);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();