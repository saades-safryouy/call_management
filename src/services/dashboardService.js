import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

const dashboardService = {
  getStatistics: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.DASHBOARD_STATISTICS);
    return data;
  },

  getEvaluatorDashboard: async (evaluatorId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.EVALUATOR_DASHBOARD(evaluatorId));
    return data;
  },
};

export default dashboardService;