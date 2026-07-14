/**
 * Application Constants
 * Brand color inspired by Attijariwafa Bank corporate identity.
 * Primary brand red: #E30613
 */

export const COLORS = {
  // Primary - Attijariwafa Bank red (#E30613)
  primary: '#E30613',
  primaryHover: '#C40511',
  primaryLight: '#FDE4E5',
  primaryDark: '#A2040E',

  // Secondary - Gray
  secondary: '#4B5563',
  secondaryHover: '#374151',
  secondaryLight: '#F3F4F6',

  // Backgrounds
  bgWhite: '#FFFFFF',
  bgLight: '#F9FAFB',
  bgGray: '#F3F4F6',
  bgDark: '#111827',

  // Text
  textDark: '#111827',
  textGray: '#4B5563',
  textLight: '#9CA3AF',

  // Status Colors
  success: '#059669',
  error: '#DC2626',
  warning: '#D97706',
  info: '#2563EB',

  // Borders
  borderLight: '#F3F4F6',
  borderGray: '#E5E7EB',
};

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',


    // User profile endpoints
  CURRENT_USER: '/users/me',
  CHANGE_PASSWORD: '/users/change-password',

//

  // User endpoints
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  USERS_BY_ROLE: (role) => `/users/role/${role}`,

  // Role endpoints
  ROLES: '/roles',
  ROLE_BY_ID: (id) => `/roles/${id}`,
  ROLE_BY_NAME: (name) => `/roles/name/${name}`,

  // Call for Application endpoints
  CALLS: '/calls',
  CALL_BY_ID: (id) => `/calls/${id}`,
  CALLS_BY_STATUS: (status) => `/calls/status/${status}`,
  CALLS_ACTIVE: '/calls/active',
  CALLS_BY_CREATOR: (userId) => `/calls/creator/${userId}`,

  // Application endpoints
  APPLICATIONS: '/applications',
  APPLICATION_BY_ID: (id) => `/applications/${id}`,
  APPLICATIONS_BY_STATUS: (status) => `/applications/status/${status}`,
  APPLICATIONS_BY_CANDIDATE: (candidateId) => `/applications/candidate/${candidateId}`,
  APPLICATIONS_BY_CALL: (callId) => `/applications/call/${callId}`,
  APPLICATIONS_BY_EVALUATOR: (evaluatorId) => `/applications/evaluator/${evaluatorId}`,
  APPLICATION_ASSIGN_EVALUATOR: (applicationId, evaluatorId) => `/applications/${applicationId}/assign/${evaluatorId}`,
  APPLICATION_CHANGE_STATUS: (applicationId, status) => `/applications/${applicationId}/status/${status}`,
  APPLICATIONS_ME: '/candidate/applications',

  // Documents
  DOCUMENTS: '/documents',
  DOCUMENT_UPLOAD: '/documents/upload',
  DOCUMENT_DOWNLOAD: (fileName) => `/documents/download/${fileName}`,
  DOCUMENT_BY_ID: (id) => `/documents/${id}`,
  DOCUMENTS_BY_APPLICATION: (applicationId) => `/documents/application/${applicationId}`,
  DOCUMENTS_BY_TYPE: (fileType) => `/documents/type/${fileType}`,

  // Evaluation endpoints
EVALUATIONS: '/evaluations',
EVALUATION_BY_ID: (id) =>`/evaluations/${id}`,
EVALUATIONS_BY_APPLICATION: (applicationId) =>`/evaluations/application/${applicationId}`,
EVALUATIONS_BY_EVALUATOR: (evaluatorId) =>`/evaluations/evaluator/${evaluatorId}`,
EVALUATION_AVERAGE_SCORE: (applicationId) =>`/evaluations/application/${applicationId}/average-score`,

  // Dashboard endpoints
  DASHBOARD_STATISTICS: '/dashboard/statistics',
  ADMIN_DASHBOARD: '/dashboard/admin',
  HR_DASHBOARD: '/dashboard/hr',
  MANAGER_DASHBOARD: '/dashboard/manager',
  EVALUATOR_DASHBOARD:(evaluatorId) => `/dashboard/evaluator/${evaluatorId}`,
  CANDIDATE_DASHBOARD: '/dashboard/candidate',

  


};

/**
 * Exact role strings used by the backend (Role.name / roleName).
 * Source: DataInitializationConfig + @PreAuthorize annotations.
 */
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  HR: 'HR',
  EVALUATOR: 'EVALUATOR',
  CANDIDATE: 'CANDIDATE',
};

/**
 * Landing route for each role after login / when hitting an unauthorized area.
 */
export const ROLE_HOME_PATH = {
  [USER_ROLES.ADMIN]: '/admin/dashboard',
  [USER_ROLES.MANAGER]: '/manager/dashboard',
  [USER_ROLES.HR]: '/hr/dashboard',
  [USER_ROLES.EVALUATOR]: '/evaluator/dashboard',
  [USER_ROLES.CANDIDATE]: '/candidate/dashboard',
};

/**
 * Resolve the home path for a given role, falling back to the login page
 * for unknown/undefined roles (prevents redirect loops).
 */
export const getRoleHomePath = (role) => ROLE_HOME_PATH[role] || '/login';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  REMEMBER_ME: 'rememberMe',
};
