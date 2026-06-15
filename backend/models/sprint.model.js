import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Sprint = sequelize.define('Sprint', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        project_id: { type: DataTypes.INTEGER, allowNull: false },
        sprint_number: { type: DataTypes.INTEGER, allowNull: false },
        goal: { type: DataTypes.TEXT, allowNull: true },
        start_date: { type: DataTypes.DATEONLY, allowNull: false },
        end_date: { type: DataTypes.DATEONLY, allowNull: false },
        status: { type: DataTypes.STRING(20), defaultValue: 'upcoming' }, // upcoming, active, completed
    }, {
        tableName: 'sprints',
        timestamps: true,
        underscored: true,
    });

    Sprint.associate = (models) => {
        Sprint.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
        //Sprint.hasMany(models.Task, { foreignKey: 'sprint_id', as: 'tasks' });
    };

    return Sprint;
};