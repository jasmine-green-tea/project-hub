import db from '../models/index.js';

class ProjectMemberRepository {
    async addMember(projectId, userId) {
        return await db.ProjectMember.create({ project_id: projectId, user_id: userId });
    }

    async removeMember(projectId, userId) {
        return await db.ProjectMember.destroy({ where: { project_id: projectId, user_id: userId } });
    }

    async isMember(projectId, userId) {
        const member = await db.ProjectMember.findOne({ where: { project_id: projectId, user_id: userId } });
        return !!member;
    }

    async addMembers(projectId, userIds) {
        const members = userIds.map(userId => ({ project_id: projectId, user_id: userId }));
        return await db.ProjectMember.bulkCreate(members, { ignoreDuplicates: true });
    }
}

export default new ProjectMemberRepository();