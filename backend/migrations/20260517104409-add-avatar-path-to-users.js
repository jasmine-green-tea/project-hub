export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'avatar_path', {
    type: Sequelize.STRING(255),
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('users', 'avatar_path');
}