import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Institute = sequelize.define('Institute', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING(200), allowNull: false, unique: true },
    short_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  }, { tableName: 'institutes', timestamps: false, underscored: true });

  Institute.associate = (models) => {
    Institute.hasMany(models.Direction, { foreignKey: 'institute_id', as: 'directions' });
    Institute.hasMany(models.Department, { foreignKey: 'institute_id', as: 'departments' });
  };

  return Institute;
};