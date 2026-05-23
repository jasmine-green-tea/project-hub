import UserRepository from '../repositories/user.repository.js';
import fs from 'fs';
import path from 'path';

class AvatarService {
  async updateAvatar(userId, file) {
    if (!file) throw new Error('No file uploaded');
    const avatarPath = `/uploads/avatars/${file.filename}`;
    // удаляем старый аватар, если есть
    const user = await UserRepository.findById(userId);
    if (user.avatar_path) {
      const oldPath = path.join(process.cwd(), user.avatar_path);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    await UserRepository.updateAvatar(userId, avatarPath);
    return { avatar_path: avatarPath };
  }
}

export default new AvatarService();