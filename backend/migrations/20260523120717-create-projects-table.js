export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('projects', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING(200), allowNull: false },
    description: { type: Sequelize.TEXT },
    semester: { type: Sequelize.STRING(20), allowNull: false },
    year: { type: Sequelize.INTEGER, allowNull: false },
    institute_id: { type: Sequelize.INTEGER, references: { model: 'institutes', key: 'id' } },
    direction_id: { type: Sequelize.INTEGER, references: { model: 'directions', key: 'id' } },
    course: { type: Sequelize.INTEGER },
    created_by: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, allowNull: false },
    status: { type: Sequelize.STRING(20), defaultValue: 'active' },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('projects');
}