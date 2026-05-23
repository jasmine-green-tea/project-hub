import db from '../models/index.js';

class UserRepository {
  async findByEmail(email) {
    return await db.User.findOne({ where: { email } });
  }

  async findById(id, excludePassword = true) {
    const attributes = excludePassword ? { exclude: ['password'] } : undefined;
    return await db.User.findByPk(id, { attributes });
  }

  async create(userData) {
    //console.log(userData);
    return await db.User.create(userData);
  }

  async update(id, data) {
    const user = await db.User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.update(data);
  }

  async updateAvatar(userId, avatarPath) {
    const user = await db.User.findByPk(userId);
    if (!user) throw new Error('User not found');
    try {
      return await user.update({ avatar_path: avatarPath });
    } catch(err) {
      console.log('UserRepository.updateAvatar user.update err = ', err);
    }
  }
}

export default new UserRepository();