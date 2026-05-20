export async function up(queryInterface) {
  await queryInterface.removeColumn('students', 'education_form');
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn('students', 'education_form', {
    type: Sequelize.INTEGER,
    allowNull: true,
  });
}