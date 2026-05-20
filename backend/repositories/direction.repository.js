import db from '../models/index.js';

class DirectionRepository {
    async getByInstituteId(instituteId) {
        return await db.Direction.findAll({
            where: { institute_id: instituteId },
            order: [['full_name', 'ASC']],
        });
    }
}

export default new DirectionRepository();