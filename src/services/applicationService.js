import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

const applicationService = {
  create: async (application) => {
    const { data } = await axiosClient.post(
      API_ENDPOINTS.APPLICATIONS,
      application
    );
    return data;
  },

  getAll: async () => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.APPLICATIONS
    );
    return data;
  },
  
  getMyApplications: async () => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.APPLICATIONS_ME
    );
    return data;
  },
  
  getById: async (id) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.APPLICATION_BY_ID(id)
    );
    return data;
  },

  getByStatus: async (status) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.APPLICATIONS_BY_STATUS(status)
    );
    return data;
  },

  getByEvaluator: async (evaluatorId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.APPLICATIONS_BY_EVALUATOR(evaluatorId)
    );
    return data;
  },

  update: async (id, application) => {
    const { data } = await axiosClient.put(
      API_ENDPOINTS.APPLICATION_BY_ID(id),
      application
    );
    return data;
  },

  /**
   * Assign evaluator
   * PUT /applications/{applicationId}/assign/{evaluatorId}
   */
  assignEvaluator: async (applicationId, evaluatorId) => {
    const { data } = await axiosClient.put(
      API_ENDPOINTS.APPLICATION_ASSIGN_EVALUATOR(
        applicationId,
        evaluatorId
      )
    );

    return data;
  },

  /**
   * Change application status
   * PUT /applications/{applicationId}/status/{status}
   */
  changeStatus: async (applicationId, status) => {
    const { data } = await axiosClient.put(
      API_ENDPOINTS.APPLICATION_CHANGE_STATUS(
        applicationId,
        status
      )
    );

    return data;
  },

  remove: async (id) => {
    await axiosClient.delete(
      API_ENDPOINTS.APPLICATION_BY_ID(id)
    );
  }
};

export default applicationService;