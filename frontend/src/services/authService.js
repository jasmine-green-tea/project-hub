import axios from "axios";

const api = axios.create({
    baseURL: '/api/auth',
    withCredentials: true,
});

export const register = (userData) => api.post('/register', userData);
export const login = (credentials) => api.post('/login', credentials);
export const getMe = () => api.get('/me');
export const logout = () => api.post('/logout');