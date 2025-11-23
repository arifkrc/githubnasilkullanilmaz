import axios from 'axios';

const API_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me')
};

// Production Records API
export const productionRecordsAPI = {
  getAll: (params) => api.get('/production-records', { params }),
  getById: (id) => api.get(`/production-records/${id}`),
  create: (data) => api.post('/production-records', data),
  update: (id, data) => api.put(`/production-records/${id}`, data),
  delete: (id) => api.delete(`/production-records/${id}`)
};

export default api;
