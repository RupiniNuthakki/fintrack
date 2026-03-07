import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export const expenseAPI = {
  getAll: () => api.get('/expenses'),
  create: (expenseData) => api.post('/expenses', expenseData),
  update: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  delete: (id) => api.delete(`/expenses/${id}`),
  filterByDate: (startDate, endDate) => 
    api.get(`/expenses/filter?startDate=${startDate}&endDate=${endDate}`),
};

export const emiAPI = {
  getAll: () => api.get('/emis'),
  create: (emiData) => api.post('/emis', emiData),
  update: (id, emiData) => api.put(`/emis/${id}`, emiData),
  delete: (id) => api.delete(`/emis/${id}`),
};

export const subscriptionAPI = {
  getAll: () => api.get('/subscriptions'),
  create: (subData) => api.post('/subscriptions', subData),
  update: (id, subData) => api.put(`/subscriptions/${id}`, subData),
  delete: (id) => api.delete(`/subscriptions/${id}`),
};

export const dashboardAPI = {
  get: () => api.get('/dashboard'),
};

export default api;