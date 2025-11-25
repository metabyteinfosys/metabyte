// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/auth/login`,
    verify: `${API_URL}/api/auth/verify`,
  },
  quotes: `${API_URL}/api/quotes`,
  appointments: `${API_URL}/api/appointments`,
};
