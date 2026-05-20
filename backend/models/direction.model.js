import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Direction = sequelize.define('Direction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    short_name: {
      type: DataTypes.STRING(50)
    },
    education_form: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, { tableName: 'directions', timestamps: false, underscored: true });

  Direction.associate = (models) => {
    Direction.belongsTo(models.Institute, { foreignKey: 'institute_id', as: 'institute' });
    Direction.hasMany(models.Student, { foreignKey: 'direction_id', as: 'students' });
  };

  return Direction;
};