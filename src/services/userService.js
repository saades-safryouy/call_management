import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * User Service
 * Handles user CRUD operations
 */

const userService = {
  /**
   * Get all users
   * @returns {Promise<Array>} - Array of user objects
   */
  getAllUsers: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USERS);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  /**
   * Get user by ID
   * @param {number} userId - User ID
   * @returns {Promise<Object>} - User object
   */
  getUserById: async (userId) => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USER_BY_ID(userId));
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  },

  /**
   * Get users by role
   * @param {string} role - Role name (e.g., 'ADMIN', 'USER')
   * @returns {Promise<Array>} - Array of users with specified role
   */
  getUsersByRole: async (role) => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USERS_BY_ROLE(role));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users by role: ${role}`);
    }
  },

  /**
   * Update user
   * @param {number} userId - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} - Updated user object
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await axiosClient.put(
        API_ENDPOINTS.USER_BY_ID(userId),
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  },

  /**
   * Delete user
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  deleteUser: async (userId) => {
    try {
      await axiosClient.delete(API_ENDPOINTS.USER_BY_ID(userId));
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  },

  /**
   * Search users (client-side)
   * @param {Array} users - Array of users to search
   * @param {string} query - Search query
   * @returns {Array} - Filtered users
   */
  searchUsers: (users, query) => {
    if (!query) return users;

    const lowerQuery = query.toLowerCase();
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(lowerQuery) ||
        user.email?.toLowerCase().includes(lowerQuery) ||
        user.username?.toLowerCase().includes(lowerQuery)
    );
  },
};

export default userService;
