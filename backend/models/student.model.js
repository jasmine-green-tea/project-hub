import { DataTypes } from 'sequelize';
import { underscoredIf } from 'sequelize/lib/utils';

export default (sequelize) => {
  const Student = sequelize.define('Student', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    direction_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    admission_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, { tableName: 'students', timestamps: false, underscored: true });

  Student.associate = (models) => {
    Student.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Student.belongsTo(models.Direction, { foreignKey: 'direction_id', as: 'direction' });
  };

  return Student;
};