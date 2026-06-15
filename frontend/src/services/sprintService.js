import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

export const getProjectSprints = (projectId) => api.get(`/projects/${projectId}/sprints`);
export const createSprint = (projectId, data) => api.post(`/projects/${projectId}/sprints`, data);
export const updateSprint = (sprintId, data) => api.put(`/sprints/${sprintId}`, data);
export const startSprint = (sprintId) => api.post(`/sprints/${sprintId}/start`);
export const completeSprint = (sprintId) => api.post(`/sprints/${sprintId}/complete`);