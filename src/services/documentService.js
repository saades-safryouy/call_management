import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Document Service — /documents
 * Body/response: DocumentDTO { documentId, fileName, fileType, filePath, applicationId }
 *
 * NOTE: the backend stores document metadata only (fileName, fileType,
 * filePath, applicationId) via JSON. There is no multipart file-upload
 * endpoint — see the "missing endpoints" report.
 */
const documentService = {
  /** POST /documents — body requires { fileName, filePath, applicationId } */
  create: async (documentDTO) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.DOCUMENTS, documentDTO);
    return data;
  },

  /** GET /documents/{id} */
  getById: async (documentId) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.DOCUMENT_BY_ID(documentId));
    return data;
  },

  /** GET /documents/application/{applicationId} */
  getByApplication: async (applicationId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.DOCUMENTS_BY_APPLICATION(applicationId)
    );
    return data;
  },

  /** GET /documents/type/{fileType} */
  getByType: async (fileType) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.DOCUMENTS_BY_TYPE(fileType));
    return data;
  },

  /** DELETE /documents/{id} */
  remove: async (documentId) => {
    await axiosClient.delete(API_ENDPOINTS.DOCUMENT_BY_ID(documentId));
  },
};

export default documentService;
