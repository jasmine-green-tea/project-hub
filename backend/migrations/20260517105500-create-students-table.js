export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('students', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    direction_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      // references: { model: 'directions', key: 'id' }, // раскомментировать, когда будет directions
    },
    admission_year: { type: Sequelize.INTEGER, allowNull: true },
    education_form: { type: Sequelize.INTEGER, allowNull: true },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('students');
}