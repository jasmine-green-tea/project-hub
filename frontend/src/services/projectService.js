import axios from 'axios';

const api = axios.create({
    baseURL: '/api/projects',
    withCredentials: true,
});

export const createProject = (data) => api.post('/', data);
export const getUserProjects = () => api.get('/');
export const getProjectById = (id) => api.get(`/${id}`);