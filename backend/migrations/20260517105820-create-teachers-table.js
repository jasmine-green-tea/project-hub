export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('teachers', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    department_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      // references: { model: 'departments', key: 'id' }, // раскомментировать, когда будет departments
    },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('teachers');
}