import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProjectMember = sequelize.define('ProjectMember', {
    id: { type:
        DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    tableName: 'project_members',
    timestamps: false,
    underscored: true,
  });
  ProjectMember.associate = (models) => {
    ProjectMember.belongsTo(models.Project, { foreignKey: 'project_id' });
    ProjectMember.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return ProjectMember;
};