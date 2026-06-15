import axios from 'axios';

const api = axios.create({
  baseURL: '/api/users',
  withCredentials: true,
});

export const searchUsers = (query, role) => api.get(`/search?q=${query}&role=${role}`);