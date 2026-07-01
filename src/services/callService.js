import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Call-for-Application Service — /calls
 * Body/response: CallForApplicationDTO
 *   { callId, title, description, openingDate, closingDate, status,
 *     createdById, createdByEmail, createdAt, updatedAt }
 *
 * BACKEND ACCESS NOTE: SecurityConfig restricts ALL /calls/** to ADMIN & MANAGER.
 * CANDIDATE / EVALUATOR / HR currently receive 403 (pending the agreed backend
 * relaxation for candidate/evaluator read access to /calls/active).
 */
const callService = {
  /** GET /calls */
  getAll: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALLS);
    return data;
  },

  /** GET /calls/{id} */
  getById: async (callId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALL_BY_ID(callId));
    return data;
  },

  /** GET /calls/status/{status} */
  getByStatus: async (status) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALLS_BY_STATUS(status));
    return data;
  },

  /** GET /calls/active */
  getActive: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALLS_ACTIVE);
    return data;
  },

  /** GET /calls/creator/{userId} */
  getByCreator: async (userId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.CALLS_BY_CREATOR(userId));
    return data;
  },

  /** POST /calls (ADMIN, HR, MANAGER) */
  create: async (callDTO) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.CALLS, callDTO);
    return data;
  },

  /** PUT /calls/{id} (ADMIN, HR, MANAGER) */
  update: async (callId, callDTO) => {
    const { data } = await axiosClient.put(API_ENDPOINTS.CALL_BY_ID(callId), callDTO);
    return data;
  },

  /** DELETE /calls/{id} (ADMIN, HR) */
  remove: async (callId) => {
    await axiosClient.delete(API_ENDPOINTS.CALL_BY_ID(callId));
  },
};

export default callService;
