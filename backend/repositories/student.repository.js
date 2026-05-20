import db from '../models/index.js';

class StudentRepository {
  async create(userId) {
    return await db.Student.create({ user_id: userId });
  }

  async findByUserId(userId) {
    try {
      const student = await db.Student.findOne({
        where: { user_id: userId },
        include: [
          {
            model: db.Direction,
            as: 'direction',          // должно совпадать с as в ассоциации Student.belongsTo
            include: [
              {
                model: db.Institute,
                as: 'institute',      // должно совпадать с as в ассоциации Direction.belongsTo
              },
            ],
          },
        ],
      });
      return student;
    } catch (error) {
      console.error('Error in StudentRepository.findByUserId:', error);
      throw error;
    }
  }

  async update(userId, data) {
    const student = await db.Student.findOne({ where: { user_id: userId } });
    if (!student) throw new Error('Student record not found');
    return await student.update(data);
  }

}

export default new StudentRepository();