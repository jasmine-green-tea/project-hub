import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository.js';
import StudentRepository from '../repositories/student.repository.js';
import TeacherRepository from '../repositories/teacher.repository.js';

class AuthService {
    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    }

    async register(userData) {
        const { role, name, surname, email, password } = userData;

        // Проверка существования
        const existing = await UserRepository.findByEmail(email);
        if (existing) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = null;
        try
        {
            const newUser = await UserRepository.create({
                role,
                name,
                surname,
                email,
                password_hash: hashedPassword,
        });

        if (role === 'student') {
            await StudentRepository.create(newUser.id);
        } else if (role === 'teacher') {
            await TeacherRepository.create(newUser.id);
        }

        const token = this.generateToken(newUser.id);
        return { token, user: { id: newUser.id, role, name, surname, email, created_at: newUser.created_at} };
        }
        catch(err)
        {
            console.log(`register ERROR: ${err}`);
        }
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        // Проверяем, что пароль сохранён
        if (!user.password_hash || typeof user.password_hash !== 'string') {
            console.error('Password hash missing for user:', email);
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = this.generateToken(user.id);
        return {
            token,
            user: {
                id: user.id,
                role: user.role,
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
        };
    }

    async getMe(userId) {
        const user = await UserRepository.findById(userId);
        if (!user) throw new Error('User not found');
        return user;
    }
}

export default new AuthService();