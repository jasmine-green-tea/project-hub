import AuthService from '../services/auth.service.js';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
};

class AuthController {
    async register(req, res, next) {
        try {
            const { token, user } = await AuthService.register(req.body);
            res.cookie('token', token, cookieOptions);
            res.status(201).json({ user });
        } catch (err) {
            console.log(`AuthController ERROR: ${err}`);
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { token, user } = await AuthService.login(email, password);
            res.cookie('token', token, cookieOptions);
            res.json({ user });
        } catch (err) {
            next(err);
        }
    }

    async me(req, res, next) {
        try {
            res.json(req.user);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            res.cookie('token', '', { ...cookieOptions, maxAge: 1 });
            res.json({ message: 'Logged out successfully' });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();