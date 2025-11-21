import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export interface QuoteData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  projectDescription: string;
  budget?: string;
  timeline?: string;
}

export const appointmentAPI = {
  create: (data: AppointmentData) => api.post('/appointments', data),
  getAll: () => api.get('/appointments'),
  getById: (id: string) => api.get(`/appointments/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};

export const quoteAPI = {
  create: (data: QuoteData) => api.post('/quotes', data),
  getAll: () => api.get('/quotes'),
  getById: (id: string) => api.get(`/quotes/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/quotes/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/quotes/${id}`),
};

export default api;
