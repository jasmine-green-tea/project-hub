import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: DataTypes.TEXT,
    semester: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    institute_id: DataTypes.INTEGER,
    direction_id: DataTypes.INTEGER,
    course: DataTypes.INTEGER,
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'active'
    },
  }, {
    tableName: 'projects',
    timestamps: true,
    underscored: true,
  });

  Project.associate = (models) => {
    Project.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Project.belongsTo(models.Institute, { foreignKey: 'institute_id', as: 'institute' });
    Project.belongsTo(models.Direction, { foreignKey: 'direction_id', as: 'direction' });
    Project.belongsToMany(models.User, { through: models.ProjectMember, foreignKey: 'project_id', otherKey: 'user_id', as: 'members' });
  };
  return Project;
};