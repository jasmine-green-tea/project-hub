import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await authService.getMe();
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const registerUser = async (userData) => {
        try {
            const res = await authService.register(userData);
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return { success: false, error: err.response?.data?.message };
        }
    };

    const loginUser = async (email, password) => {
        try {
            const res = await authService.login({ email, password });
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return { success: false, error: err.response?.data?.message };
        }
    };

    const logoutUser = async () => {
        await authService.logout();
        setUser(null);
    };

    // return { user, loading, error, registerUser, loginUser, logoutUser };

    return (
    <AuthContext.Provider value={{ user, loading, error, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);