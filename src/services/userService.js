import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * User Service — /users
 * Pure API communication. Errors bubble up with the interceptor's
 * `error.userMessage` attached; callers surface them via toasts.
 *
 * NOTE: the backend exposes no POST /users. New users are created through
 * authService.register (POST /auth/register), which requires a roleName.
 */
const userService = {
  /**
   * Create a user via POST /auth/register.
   * Unlike authService.register, this does NOT persist the returned token/user,
   * so an admin creating an account keeps their own session intact.
   * @param {{email, password, firstName, lastName, roleName}} payload
   */
  create: async (payload) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.REGISTER, payload);
    return data;
  },

  /** GET /users — list all users (ADMIN, MANAGER). */
  getAll: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.USERS);
    return data;
  },

  /** GET /users/{id} */
  getById: async (userId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.USER_BY_ID(userId));
    return data;
  },

  /** GET /users/role/{roleName} */
  getByRole: async (roleName) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.USERS_BY_ROLE(roleName));
    return data;
  },

  /** PUT /users/{id} — body: UserDTO */
  update: async (userId, userDTO) => {
    const { data } = await axiosClient.put(API_ENDPOINTS.USER_BY_ID(userId), userDTO);
    return data;
  },

  /** DELETE /users/{id} (ADMIN only) */
  remove: async (userId) => {
    await axiosClient.delete(API_ENDPOINTS.USER_BY_ID(userId));
  },
};

export default userService;
