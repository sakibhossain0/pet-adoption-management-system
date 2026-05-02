import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

function readSavedUser() {
  try {
    const saved = localStorage.getItem('pawfect-user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSavedUser);
  const [token, setToken] = useState(() => localStorage.getItem('pawfect-token'));

  useEffect(() => {
    if (user) {
      localStorage.setItem('pawfect-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pawfect-user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('pawfect-token', token);
    } else {
      localStorage.removeItem('pawfect-token');
    }
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isAdmin: String(user?.user_type || user?.role || '').toUpperCase() === 'ADMIN',
      async login(credentials) {
        const response = await apiClient.post('/login', credentials);
        setUser(response.data.user);
        setToken(response.data.token);
        return response.data.user;
      },
      async register(payload) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value === undefined || value === null || value === '') return;
          formData.append(key, value);
        });
        const response = await apiClient.post('/register', formData);
        setUser(response.data.user);
        setToken(response.data.token);
        return response.data.user;
      },
      async logout() {
        try {
          await apiClient.post('/logout');
        } catch {
          // Logging out locally is still correct if the API is unavailable.
        }
        setUser(null);
        setToken(null);
      },
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
