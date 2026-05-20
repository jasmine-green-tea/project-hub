export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('institutes', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: Sequelize.STRING(200), allowNull: false, unique: true },
    short_name: { type: Sequelize.STRING(50), allowNull: false, unique: true },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('institutes');
}