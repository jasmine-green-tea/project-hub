import db from '../models/index.js';

class TeacherRepository {
  async create(userId) {
    return await db.Teacher.create({ user_id: userId });
  }

  async findByUserId(userId) {
    return await db.Teacher.findOne({
      where: { user_id: userId },
      include: [
        {
          model: db.Department,
          as: 'department',
          include: [{ model: db.Institute, as: 'institute' }],
        },
      ],
    });
  }

  async update(userId, data) {
    const teacher = await db.Teacher.findOne({ where: { user_id: userId } });
    if (!teacher) throw new Error('Teacher record not found');
    return await teacher.update(data);
  }
}

export default new TeacherRepository();