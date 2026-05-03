import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import apiClient from '../services/apiClient';
import { formDataFromObject } from '../services/contentService';

const AuthContext = createContext(null);

function readSavedUser() {
  try {
    const saved = localStorage.getItem('pawfect-user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function hasFile(payload) {
  return Object.values(payload || {}).some((value) => value instanceof File);
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

  useEffect(() => {
    if (!token) return;

    apiClient.get('/me')
      .then((response) => setUser(response.data))
      .catch(() => {
        setUser(null);
        setToken(null);
      });
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
      async refreshUser() {
        const response = await apiClient.get('/me');
        setUser(response.data);
        return response.data;
      },
      async updateProfile(payload) {
        const body = hasFile(payload) ? formDataFromObject({ ...payload, _method: 'PUT' }) : payload;
        const response = hasFile(payload) ? await apiClient.post('/me', body) : await apiClient.put('/me', body);
        setUser(response.data.user);
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
