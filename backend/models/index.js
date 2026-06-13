import sequelize from '../config/database.js';
import defineUser from './user.model.js';
import defineStudent from './student.model.js';
import defineTeacher from './teacher.model.js';
import defineInstitute from './institute.model.js'
import defineDirection from './direction.model.js'
import defineDepartment from './department.model.js'
import defineProject from './project.model.js'
import defineProjectMember from './projectMember.model.js'

const db = {};
db.sequelize = sequelize;

// Пользователи
db.User = defineUser(sequelize);
db.Student = defineStudent(sequelize);
db.Teacher = defineTeacher(sequelize);
// Справочник
db.Institute = defineInstitute(sequelize);
db.Direction = defineDirection(sequelize);
db.Department = defineDepartment(sequelize);
// Проект
db.Project = defineProject(sequelize);
db.ProjectMember = defineProjectMember(sequelize);

/// Вызываем ассоциации для каждой модели
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;