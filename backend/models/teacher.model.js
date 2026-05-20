import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Teacher = sequelize.define('Teacher', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    department_id: { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: 'teachers', timestamps: false, underscored: true });

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Teacher.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' });
  };

  return Teacher;
};