import axios from 'axios';
import Cookies from 'js-cookie';

// Replace with the URL where your Node.js backend is running (e.g., port 3000)
const API_BASE_URL = 'http://localhost:4000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // IMPORTANT: Allows cookies (like your JWT) to be sent
});

// Request Interceptor: Attach JWT to Authorization header if available
api.interceptors.request.use((config) => {
  // Assuming your backend sets a standard cookie named 'jwt'
  const token = Cookies.get('jwt'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Export functions grouped by domain
export const authApi = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  signup: (userData: any) => api.post('/auth/signup', userData),
};

export const listingsApi = {
  // Accepts search parameters for the Listings and Search requirement (3)
  getAll: (searchParams: any = {}) => api.get('/listings', { params: searchParams }),
  getOne: (id: string) => api.get(`/listings/${id}`),
};

export const bookingApi = {
  create: (bookingData: any) => api.post('/bookings', bookingData),
};

export default api;