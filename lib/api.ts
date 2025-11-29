import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:4000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // IMPORTANT: Allows cookies (like your JWT) to be sent
});

// === REQUEST INTERCEPTOR (For Auth Token) ===
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

// === RESPONSE INTERCEPTOR (For Logging) ===
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log(`[API SUCCESS] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    // Log failed responses
    if (error.response) {
      // The request was made and the server responded with a status code 
      // that falls out of the range of 2xx
      console.log(`[API ERROR] ${error.response.config.method?.toUpperCase()} ${error.response.config.url} - Status: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('[API ERROR] No response received from server:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('[API ERROR] Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);


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