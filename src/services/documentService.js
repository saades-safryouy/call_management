import axiosClient from '../api/client';
import { API_ENDPOINTS } from '../utils/constants';

const documentService = {
  /**
   * Upload document
   * POST /documents/upload
   */
  upload: async (file, applicationId) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('applicationId', applicationId);

    const { data } = await axiosClient.post(
      API_ENDPOINTS.DOCUMENT_UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  },

  /**
   * Download file
   */
  download: async (fileName) => {
    const response = await axiosClient.get(
      API_ENDPOINTS.DOCUMENT_DOWNLOAD(fileName),
      {
        responseType: "blob",
      }
    );
  
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
  
    link.href = url;
    link.setAttribute("download", fileName);
  
    document.body.appendChild(link);
  
    link.click();
  
    link.remove();
  
    window.URL.revokeObjectURL(url);
  },

   /**
   * Get all documents
   */
  getAll: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.DOCUMENTS);
    return data;
  },

  /**
   * Get document by id
   */
  getById: async (documentId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.DOCUMENT_BY_ID(documentId)
    );

    return data;
  },

  /**
   * Documents of one application
   */
  getByApplication: async (applicationId) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.DOCUMENTS_BY_APPLICATION(applicationId)
    );

    return data;
  },

  /**
   * Filter by type
   */
  getByType: async (type) => {
    const { data } = await axiosClient.get(
      API_ENDPOINTS.DOCUMENTS_BY_TYPE(type)
    );

    return data;
  },

  /**
   * Delete document
   */
  remove: async (documentId) => {
    await axiosClient.delete(
      API_ENDPOINTS.DOCUMENT_BY_ID(documentId)
    );
  },
};

export default documentService;