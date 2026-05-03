import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('pawfect-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pawfect-token');
      localStorage.removeItem('pawfect-user');
    }
    return Promise.reject(error);
  },
);

export function getApiOrigin() {
  const baseUrl = apiClient.defaults.baseURL || '';
  return baseUrl.replace(/\/api\/?$/, '');
}

export default apiClient;
