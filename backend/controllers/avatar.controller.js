import AvatarService from '../services/avatar.service.js';

class AvatarController {
    async uploadAvatar(req, res, next) {
        try {
            console.log('AvatarController.uploadAvatar req = ', req);
            const result = await AvatarService.updateAvatar(req.user.id, req.file);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

export default new AvatarController();