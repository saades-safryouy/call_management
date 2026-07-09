import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * User Service - /users
 * Pure API communication. Errors bubble up with the interceptor's
 * `error.userMessage` attached; callers surface them via toasts.
 */
const userService = {
  /** GET /users - list users. Accepts optional filter/pagination params. */
  getAll: async (params = {}) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.USERS, { params });
    return data;
  },

  /** GET /users/{id} */
  getById: async (userId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.USER_BY_ID(userId));
    return data;
  },

  /** GET /users/me - current authenticated user profile. */
  getCurrentUser: async () => {
    const { data } = await axiosClient.get('/users/me');
    return data;
  },

  /** GET /users/role/{roleName} */
  getByRole: async (roleName) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.USERS_BY_ROLE(roleName));
    return data;
  },

  /** POST /users */
  create: async (payload) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.USERS, payload);
    return data;
  },

  /** PUT /users/{id} */
  update: async (userId, payload) => {
    const { data } = await axiosClient.put(API_ENDPOINTS.USER_BY_ID(userId), payload);
    return data;
  },

  /** PUT /users/me - update current authenticated user profile. */
  updateCurrentUser: async (payload) => {
    const { data } = await axiosClient.put('/users/me', payload);
    return data;
  },

  /** PUT /users/me/change-password */
  changePassword: async (payload) => {
    const { data } = await axiosClient.put('/users/me/change-password', payload);
    return data;
  },

  /** PATCH /users/{id}/status - enable/disable user when supported by backend. */
  updateStatus: async (userId, enabled) => {
    const { data } = await axiosClient.patch(`${API_ENDPOINTS.USER_BY_ID(userId)}/status`, {
      enabled,
    });
    return data;
  },

  /** DELETE /users/{id} */
  remove: async (userId) => {
    await axiosClient.delete(API_ENDPOINTS.USER_BY_ID(userId));
  },
};

export default userService;
