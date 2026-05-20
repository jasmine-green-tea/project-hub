import ProfileService from '../services/profile.service.js';

class ProfileController {
    async getProfile(req, res, next) {
        try {
            const profile = await ProfileService.getProfile(req.user.id);
            res.json(profile);
        } catch (err) {
        next(err);
        }
    }

    async updateProfile(req, res, next) {
    try {
      const updated = await ProfileService.updateProfile(req.user.id, req.body, req.user.role);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProfileController();