import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Calls Service - /calls
 * Handles calls for applications.
 */
const callService = {
  /** GET /calls - accepts optional filter/pagination params. */
  getAll: async (params = {}) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALLS, { params });
    return data;
  },

  /** GET /calls/{id} */
  getById: async (callId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALL_BY_ID(callId));
    return data;
  },

  /** GET /calls/status/{status} */
  getByStatus: async (status, params = {}) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALLS_BY_STATUS(status), { params });
    return data;
  },

  /** GET /calls/active */
  getActive: async (params = {}) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALLS_ACTIVE, { params });
    return data;
  },

  /** GET /calls/creator/{userId} */
  getByCreator: async (userId, params = {}) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALLS_BY_CREATOR(userId), { params });
    return data;
  },

  /** POST /calls */
  create: async (payload) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.CALLS, payload);
    return data;
  },

  /** PUT /calls/{id} */
  update: async (callId, payload) => {
    const { data } = await axiosClient.put(API_ENDPOINTS.CALL_BY_ID(callId), payload);
    return data;
  },

  /** DELETE /calls/{id} */
  remove: async (callId) => {
    await axiosClient.delete(API_ENDPOINTS.CALL_BY_ID(callId));
  },
};

export default callService;
