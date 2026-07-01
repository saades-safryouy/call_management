import axiosClient from '../api/client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

/**
 * Authentication Service
 * Handles login, register, current-user retrieval and token management.
 *
 * Backend contracts (source of truth):
 *  - POST /auth/login    -> AuthResponse { token, type, userId, email, roleName }
 *  - POST /auth/register -> AuthResponse { token, type, userId, email, roleName }
 *  - GET  /auth/me       -> UserDTO { userId, email, firstName, lastName, enabled, roleName, ... }
 */

/**
 * Normalize any user-bearing payload (AuthResponse or UserDTO) into a single
 * consistent shape used throughout the frontend.
 */
const normalizeUser = (data) => {
  if (!data) return null;

  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();

  return {
    userId: data.userId ?? null,
    email: data.email ?? null,
    role: data.role || data.roleName || null,
    firstName: firstName || null,
    lastName: lastName || null,
    name: fullName || null,
  };
};

const persistSession = (token, user) => {
  if (token) localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

const authService = {
  normalizeUser,

  /**
   * Login with email + password.
   * @returns {Promise<{token: string, user: object}>}
   */
  login: async (email, password) => {
    try {
      const { data } = await axiosClient.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const user = normalizeUser(data);
      persistSession(data.token, user);

      return { token: data.token, user };
    } catch (error) {
      const message =
        error.userMessage ||
        error.response?.data?.message ||
        'Login failed. Please check your credentials.';
      throw new Error(message);
    }
  },

  /**
   * Register a new account.
   * @param {Object} registerData - { email, password, firstName, lastName, roleName }
   * @returns {Promise<{token: string, user: object}>}
   */
  register: async (registerData) => {
    try {
      const { data } = await axiosClient.post(API_ENDPOINTS.REGISTER, registerData);

      const user = normalizeUser(data);
      persistSession(data.token, user);

      return { token: data.token, user };
    } catch (error) {
      const message =
        error.userMessage ||
        error.response?.data?.message ||
        'Registration failed. Please try again.';
      throw new Error(message);
    }
  },

  /**
   * Fetch the authenticated user's full profile from /auth/me and refresh
   * the cached user. Throws on failure (e.g. expired token).
   * @returns {Promise<object>} normalized user
   */
  getCurrentUser: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CURRENT_USER);
    const user = normalizeUser(data);
    if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  /**
   * Clear the local session.
   */
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  isLoggedIn: () => !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),

  getToken: () => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),

  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    if (!user || user === 'undefined') return null;
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  },
};

export default authService;
