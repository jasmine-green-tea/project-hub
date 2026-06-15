import axios from 'axios';

const api = axios.create({
    baseURL: '/api/projects',
    withCredentials: true,
});

export const createProject = (data) => api.post('/', data);
export const getUserProjects = () => api.get('/');
export const getProjectById = (id) => api.get(`/${id}`);
export const updateProject = (id, data) => api.put(`/${id}`, data);
export const addProjectMembers = (projectId, userId) => api.post(`/${projectId}/members`, { userId });