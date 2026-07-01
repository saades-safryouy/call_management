import axios from 'axios';
import { STORAGE_KEYS } from '../utils/constants';

// API Base URL
export const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Clear the session and send the user to the login screen.
 * Guarded so we never bounce a user who is already on /login.
 */
const forceLogout = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  if (!window.location.pathname.startsWith('/login')) {
    window.location.assign('/login');
  }
};

/**
 * Turn any axios error into a single, user-friendly message.
 * Maps known backend quirks (e.g. bad credentials returning HTTP 500 with a
 * generic message) to something meaningful.
 */
export const getApiErrorMessage = (error) => {
  const status = error.response?.status;
  const data = error.response?.data;
  const url = error.config?.url || '';

  if (error.code === 'ERR_NETWORK') {
    return 'Unable to reach the server. Please check your connection.';
  }

  // Backend returns 500 with a generic message on invalid login credentials.
  if (status === 500 && url.includes('/auth/login')) {
    return 'Invalid email or password.';
  }

  // Prefer a specific backend validation message when present.
  if (data?.message && typeof data.message === 'string' && data.message !== 'An unexpected error occurred') {
    return data.message;
  }

  switch (status) {
    case 400:
      return 'The request was invalid. Please review the form and try again.';
    case 401:
      return 'Your session has expired. Please sign in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'This action conflicts with existing data.';
    case 422:
      return 'Some of the provided data is invalid.';
    case 500:
    case 502:
    case 503:
      return 'A server error occurred. Please try again later.';
    default:
      return data?.message || 'Something went wrong. Please try again.';
  }
};

// Request interceptor - attach the JWT
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - normalize errors and handle auth failures.
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const config = error.config || {};

    // Always expose a friendly message for callers/toasts.
    error.userMessage = getApiErrorMessage(error);

    // 401 => session invalid/expired.
    if (status === 401) {
      forceLogout();
      return Promise.reject(error);
    }

    // The backend returns 403 both for expired tokens AND legitimate
    // "insufficient role" cases. Disambiguate by re-validating the session:
    //  - /auth/me still OK  => genuine forbidden (let the caller handle it)
    //  - /auth/me also fails => token is dead => log out.
    if (status === 403 && !config._authCheck && localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)) {
      try {
        await axiosClient.get('/auth/me', { _authCheck: true });
      } catch {
        forceLogout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
