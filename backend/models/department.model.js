import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Department = sequelize.define('Department', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    institute_id: { type: DataTypes.INTEGER, allowNull: false },
    full_name: { type: DataTypes.STRING(200), allowNull: false },
    short_name: { type: DataTypes.STRING(50) },
  }, { tableName: 'directions', timestamps: false, underscored: true });

  Department.associate = (models) => {
    Department.belongsTo(models.Institute, { foreignKey: 'institute_id', as: 'institute' });
    Department.hasMany(models.Teacher, { foreignKey: 'department_id', as: 'teachers' });
  };

  return Department;
};