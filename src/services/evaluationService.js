import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Evaluation Service — /evaluations
 * Body/response: EvaluationDTO
 *   { evaluationId, score (0-100), comment, evaluationDate,
 *     applicationId, evaluatorId, evaluatorEmail, createdAt }
 *
 * BACKEND ACCESS NOTE: GET /evaluations/evaluator/{id} is restricted to
 * ADMIN & MANAGER, so an EVALUATOR cannot list their own evaluations through
 * that endpoint. There is also no "list all evaluations" endpoint.
 */
const evaluationService = {
  /** POST /evaluations (ADMIN, MANAGER, HR, EVALUATOR) */
  create: async (evaluationDTO) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.EVALUATIONS, evaluationDTO);
    return data;
  },

  /** GET /evaluations/{id} */
  getById: async (evaluationId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.EVALUATION_BY_ID(evaluationId));
    return data;
  },

  /** GET /evaluations/application/{applicationId} */
  getByApplication: async (applicationId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.EVALUATIONS_BY_APPLICATION(applicationId)
    );
    return data;
  },

  /** GET /evaluations/evaluator/{evaluatorId} (ADMIN, MANAGER) */
  getByEvaluator: async (evaluatorId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.EVALUATIONS_BY_EVALUATOR(evaluatorId)
    );
    return data;
  },

  /** GET /evaluations/application/{applicationId}/average-score -> Double */
  getAverageScore: async (applicationId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.EVALUATION_AVERAGE_SCORE(applicationId)
    );
    return data;
  },

  /** PUT /evaluations/{id} (ADMIN, MANAGER, HR, EVALUATOR) */
  update: async (evaluationId, evaluationDTO) => {
    const { data } = await axiosClient.put(
      API_ENDPOINTS.EVALUATION_BY_ID(evaluationId),
      evaluationDTO
    );
    return data;
  },

  /** DELETE /evaluations/{id} (ADMIN only) */
  remove: async (evaluationId) => {
    await axiosClient.delete(API_ENDPOINTS.EVALUATION_BY_ID(evaluationId));
  },
};

export default evaluationService;
