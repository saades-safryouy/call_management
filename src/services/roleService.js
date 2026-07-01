import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Role Service — /roles
 * Body/response shape: Role { roleId, name, description }.
 * All endpoints require authentication.
 */
const roleService = {
  /** GET /roles */
  getAll: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.ROLES);
    return data;
  },

  /** GET /roles/{id} */
  getById: async (id) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.ROLE_BY_ID(id));
    return data;
  },

  /** GET /roles/name/{name} */
  getByName: async (name) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.ROLE_BY_NAME(name));
    return data;
  },

  /** POST /roles — body: { name, description } */
  create: async (role) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.ROLES, role);
    return data;
  },

  /** PUT /roles/{id} — body: { name, description } */
  update: async (id, role) => {
    const { data } = await axiosClient.put(API_ENDPOINTS.ROLE_BY_ID(id), role);
    return data;
  },

  /** DELETE /roles/{id} */
  remove: async (id) => {
    await axiosClient.delete(API_ENDPOINTS.ROLE_BY_ID(id));
  },
};

export default roleService;
