import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// Configuration de base d'axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion des erreurs de connexion
    if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_CONNECTION_REFUSED')) {
      toast.error('❌ Impossible de se connecter au serveur. Veuillez vérifier que le backend est démarré sur le port 5000.');
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      Cookies.remove('token');
      toast.info('🔐 Session expirée, redirection vers la page de connexion...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return Promise.reject(error);
    }
    
    // Afficher les erreurs avec toast
    const message = error.response?.data?.message || 'Une erreur est survenue';
    if (error.response?.status !== 401) {
      toast.error(`❌ ${message}`);
    }
    
    return Promise.reject(error);
  }
);

// API d'authentification
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
};

// API des utilisateurs
export const userAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, data) => api.put(`/users/${id}`, data),
  getStats: (id) => api.get(`/users/${id}/stats`),
  getAllUsers: (params) => api.get('/users', { params }),
  deleteUser: (id) => api.delete(`/users/${id}`),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
};

// API des abonnements
export const subscriptionAPI = {
  getPlans: () => api.get('/subscriptions/plans'),
  createPlan: (data) => api.post('/subscriptions/plans', data),
  updatePlan: (id, data) => api.put(`/subscriptions/plans/${id}`, data),
  deletePlan: (id) => api.delete(`/subscriptions/plans/${id}`),
  getMySubscriptions: () => api.get('/subscriptions/my-subscriptions'),
  subscribe: (data) => api.post('/subscriptions/subscribe', data),
  cancelSubscription: (id) => api.post(`/subscriptions/${id}/cancel`),
  getAllSubscriptions: (params) => api.get('/subscriptions', { params }),
  getStats: () => api.get('/subscriptions/stats'),
};

// API des commandes
export const orderAPI = {
  getProducts: (params) => api.get('/orders/products', { params }),
  getProduct: (id) => api.get(`/orders/products/${id}`),
  createProduct: (data) => api.post('/orders/products', data),
  updateProduct: (id, data) => api.put(`/orders/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/orders/products/${id}`),
  createOrder: (data) => api.post('/orders', data),
  getMyOrders: (params) => api.get('/orders/my-orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  getAllOrders: (params) => api.get('/orders', { params }),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  getStats: () => api.get('/orders/stats'),
};

// API du parrainage
export const referralAPI = {
  getMyReferrals: () => api.get('/referrals/my-referrals'),
  createCode: () => api.post('/referrals/create-code'),
  verifyCode: (code) => api.get(`/referrals/verify/${code}`),
  getAllReferrals: (params) => api.get('/referrals', { params }),
  getStats: () => api.get('/referrals/stats'),
  updateCommissionRate: (rate) => api.put('/referrals/commission-rate', { rate }),
};

// API des tickets
export const ticketAPI = {
  createTicket: (data) => api.post('/tickets', data),
  getMyTickets: (params) => api.get('/tickets/my-tickets', { params }),
  getTicket: (id) => api.get(`/tickets/${id}`),
  addMessage: (id, data) => api.post(`/tickets/${id}/messages`, data),
  updateStatus: (id, status) => api.put(`/tickets/${id}/status`, { status }),
  getAllTickets: (params) => api.get('/tickets', { params }),
  assignTicket: (id, adminId) => api.put(`/tickets/${id}/assign`, { adminId }),
  getStats: () => api.get('/tickets/stats'),
  deleteTicket: (id) => api.delete(`/tickets/${id}`),
  getMyAssignedTickets: (params) => api.get('/tickets/assigned', { params }),
};

// API de upload de fichiers
export const uploadAPI = {
  uploadFile: (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;