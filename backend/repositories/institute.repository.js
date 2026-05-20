import db from '../models/index.js';

class InstituteRepository {
    async getAll() {
        return await db.Institute.findAll({
            order: [['full_name', 'ASC']],
        });
    };
};

export default new InstituteRepository();