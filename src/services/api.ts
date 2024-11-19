import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const movies = {
  getAll: async () => {
    const response = await api.get('/movies');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },
};

export const favorites = {
  getAll: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },
  add: async (movieId: number) => {
    const response = await api.post(`/favorites/${movieId}`);
    return response.data;
  },
  remove: async (movieId: number) => {
    const response = await api.delete(`/favorites/${movieId}`);
    return response.data;
  },
};

export const users = {
  getPreferences: async () => {
    const response = await api.get('/users/preferences');
    return response.data;
  },
  updatePreferences: async (preferences: any) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },
};

export default api;