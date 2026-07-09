import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

const evaluationService = {

  /**
   * Create Evaluation
   */
  create: async (evaluation) => {
    const { data } = await axiosClient.post(
      API_ENDPOINTS.EVALUATIONS,
      evaluation
    );

    return data;
  },

  /**
   * Get Evaluation By ID
   */
  getById: async (evaluationId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.EVALUATION_BY_ID(evaluationId)
    );

    return data;
  },

  /**
   * Get Evaluations of an Application
   */
  getByApplication: async (applicationId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.EVALUATIONS_BY_APPLICATION(applicationId)
    );

    return data;
  },

  /**
   * Get Evaluations By Evaluator
   */
  getByEvaluator: async (evaluatorId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.EVALUATIONS_BY_EVALUATOR(evaluatorId)
    );

    return data;
  },

  /**
   * Get Average Score
   */
  getAverageScore: async (applicationId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.EVALUATION_AVERAGE_SCORE(applicationId)
    );

    return data;
  },

  /**
   * Update Evaluation
   */
  update: async (evaluationId, evaluation) => {
    const { data } = await axiosClient.put(
      API_ENDPOINTS.EVALUATION_BY_ID(evaluationId),
      evaluation
    );

    return data;
  },

  /**
   * Delete Evaluation
   */
  remove: async (evaluationId) => {
    await axiosClient.delete(
      API_ENDPOINTS.EVALUATION_BY_ID(evaluationId)
    );
  },

};

export default evaluationService;