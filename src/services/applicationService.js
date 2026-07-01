import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Application Service — /applications
 * Body/response: ApplicationDTO
 *   { applicationId, submissionDate, status, finalScore,
 *     candidateId, candidateEmail, callId, callTitle, createdAt, updatedAt }
 */
const applicationService = {
  /** POST /applications — body requires { candidateId, callId } */
  create: async (applicationDTO) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.APPLICATIONS, applicationDTO);
    return data;
  },

  /** GET /applications/{id} */
  getById: async (applicationId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.APPLICATION_BY_ID(applicationId));
    return data;
  },

  /** GET /applications — list all (ADMIN, MANAGER) */
  getAll: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.APPLICATIONS);
    return data;
  },

  /** GET /applications/status/{status} */
  getByStatus: async (status) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.APPLICATIONS_BY_STATUS(status));
    return data;
  },

  /** GET /applications/candidate/{candidateId} */
  getByCandidate: async (candidateId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.APPLICATIONS_BY_CANDIDATE(candidateId));
    return data;
  },

  /** GET /applications/call/{callId} (ADMIN, MANAGER) */
  getByCall: async (callId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.APPLICATIONS_BY_CALL(callId));
    return data;
  },

  /** PUT /applications/{id} (ADMIN, MANAGER) */
  update: async (applicationId, applicationDTO) => {
    const { data } = await axiosClient.put(
      API_ENDPOINTS.APPLICATION_BY_ID(applicationId),
      applicationDTO
    );
    return data;
  },

  /** DELETE /applications/{id} (ADMIN only) */
  remove: async (applicationId) => {
    await axiosClient.delete(API_ENDPOINTS.APPLICATION_BY_ID(applicationId));
  },
};

export default applicationService;
