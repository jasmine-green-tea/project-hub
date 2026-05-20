import db from '../models/index.js';

class DepartmentRepository {
  async getByInstituteId(instituteId) {
    return await db.Department.findAll({
      where: { institute_id: instituteId },
      order: [['full_name', 'ASC']],
    });
  }
}

export default new DepartmentRepository();