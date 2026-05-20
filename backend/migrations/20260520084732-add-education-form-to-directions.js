export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('directions', 'education_form', {
    type: Sequelize.STRING(20),
    allowNull: false,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('directions', 'education_form');
}