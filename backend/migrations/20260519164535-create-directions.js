export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('directions', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    institute_id: { type: Sequelize.INTEGER, references: { model: 'institutes', key: 'id' }, allowNull: false },
    code: { type: Sequelize.STRING(20), allowNull: false, unique: true },
    full_name: { type: Sequelize.STRING(200), allowNull: false },
    short_name: { type: Sequelize.STRING(50) },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('directions');
}