import axios from 'axios';

const api = axios.create({
  baseURL: '/api/users',  // все запросы к /api/users
  withCredentials: true,
});

export const getProfile = () => api.get('/me');
export const updateProfile = (data) => api.put('/me', data);
export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return api.post('/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
