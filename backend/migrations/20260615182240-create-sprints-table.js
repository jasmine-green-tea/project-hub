export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('sprints', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    project_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'projects', key: 'id' }, onDelete: 'CASCADE' },
    sprint_number: { type: Sequelize.INTEGER, allowNull: false },
    goal: { type: Sequelize.TEXT },
    start_date: { type: Sequelize.DATEONLY, allowNull: false },
    end_date: { type: Sequelize.DATEONLY, allowNull: false },
    status: { type: Sequelize.STRING(20), defaultValue: 'upcoming' },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
  await queryInterface.addIndex('sprints', ['project_id', 'sprint_number'], { unique: true });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('sprints');
}