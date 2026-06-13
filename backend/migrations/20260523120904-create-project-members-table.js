export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('project_members', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    project_id: { type: Sequelize.INTEGER, references: { model: 'projects', key: 'id' }, onDelete: 'CASCADE', allowNull: false },
    user_id: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE', allowNull: false },
  });
  await queryInterface.addIndex('project_members', ['project_id', 'user_id'], { unique: true });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('project_members');
}