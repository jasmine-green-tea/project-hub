import axios from 'axios';

const api = axios.create({
  baseURL: '/api/references',
  withCredentials: true,
});

export const getInstitutes = () => api.get('/institutes');
export const getDirections = (instituteId) => api.get(`/directions?instituteId=${instituteId}`);
export const getDepartments = (instituteId) => api.get(`/departments?instituteId=${instituteId}`);