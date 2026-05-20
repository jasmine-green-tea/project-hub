export async function up(queryInterface, Sequelize) {
  // Удаляем уникальное ограничение с колонки code
  await queryInterface.removeConstraint('directions', 'directions_code_key');
}

export async function down(queryInterface) {

}