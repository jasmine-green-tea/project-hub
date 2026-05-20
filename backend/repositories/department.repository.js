import db from '../models/index.js';

class DepartmentRepository {
  async getAll() {
    return await db.Department.findAll({
      include: [{ model: db.Institute, as: 'institute' }],
      order: [['full_name', 'ASC']],
    });
  }

  async getByInstituteId(instituteId) {
    console.log('Department model:', db.Department);
    return await db.Department.findAll({
      where: { institute_id: instituteId },
      order: [['full_name', 'ASC']],
    });
  }
}

export default new DepartmentRepository();