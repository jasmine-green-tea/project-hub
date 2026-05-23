import UserRepository from '../repositories/user.repository.js';
import StudentRepository from '../repositories/student.repository.js';
import TeacherRepository from '../repositories/teacher.repository.js';

class ProfileService {
    async getProfile(userId) {
        try {
            const user = await UserRepository.findById(userId);
            if (!user) throw new Error('User not found');

            // Базовая информация о пользователе
            const profile = {
                id: user.id,
                role: user.role,
                name: user.name,
                surname: user.surname,
                email: user.email,
                avatar_path: user.avatar_path,
                created_at: user.created_at,
            };

            // Получаем данные студента или преподавателя
            if (user.role === 'student') {
                let student = await StudentRepository.findByUserId(userId);
                if (student) {
                    const studentData = student.toJSON ? student.toJSON() : student;
                    profile.direction_id = studentData.direction_id;
                    profile.admission_year = studentData.admission_year;

                    if (studentData.direction) {
                        profile.direction_name = studentData.direction_full_name;
                        profile.institute_id = studentData.direction.institute?.id;
                        profile.institute_name = studentData.direction.institute?.full_name;
                        // profile.education_form = studentData.direction.education_form;
                        // if (studentData.direction.institute) {
                        //     profile.institute = studentData.direction.institute;
                        // }
                    }
                }
            } else if (user.role === 'teacher') {
                let teacher = await TeacherRepository.findByUserId(userId);
                if (teacher) {
                    const teacherData = teacher.toJSON ? teacher.toJSON() : teacher;
                    profile.department_id = teacherData.department_id;
                    if (teacherData.department) {
                        profile.department_name = teacherData.department.full_name;
                        profile.institute_id = teacherData.department.institute?.id;
                        profile.institute_name = teacherData.department.institute?.full_name;
                        // if (teacherData.department.institute) {
                        //     profile.institute = teacherData.department.institute;
                        // }
                    }
                }
            }

            return profile;
        } catch (err) {
            console.error('ProfileService.getProfile error:', err);
            throw err;
        }
    }

    async updateProfile(userId, updateData, role) {
        // обновляем общие поля (имя, фамилия)
        const userUpdate = {};
        if (updateData.name) userUpdate.name = updateData.name;
        if (updateData.surname) userUpdate.surname = updateData.surname;
        if (Object.keys(userUpdate).length) {
            await UserRepository.update(userId, userUpdate);
        }

        // обновляем специфичные для роли данные
        if (role === 'student') {
            const studentUpdate = {};
            if (updateData.direction_id !== undefined) studentUpdate.direction_id = updateData.direction_id;
            if (updateData.admission_year !== undefined) studentUpdate.admission_year = updateData.admission_year;
            if (Object.keys(studentUpdate).length) {
                await StudentRepository.update(userId, studentUpdate);
            }
        } else if (role === 'teacher') {
            if (updateData.department_id !== undefined) {
                await TeacherRepository.update(userId, { department_id: updateData.department_id });
            }
        }

        return this.getProfile(userId);
    }
}

export default new ProfileService();