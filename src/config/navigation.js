import {
  LayoutDashboard,
  Users,
  PhoneCall,
  FileText,
  Settings,
  ClipboardList,
  UserCheck,
  Scale,
  BarChart3,
  FileCheck,
  FolderOpen,
  User,
  Home,
  Search,
  Send,
} from 'lucide-react';
import { USER_ROLES } from '../utils/constants';

/**
 * Role-based navigation.
 * The layout renders ONLY the entries for the authenticated user's role, so
 * unauthorized menu items are never shown. Route guards enforce this too.
 */
export const EMPLOYEE_NAV = {
  [USER_ROLES.ADMIN]: [
    { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', to: '/admin/users', icon: Users },
    { label: 'Calls', to: '/admin/calls', icon: PhoneCall },
    { label: 'Applications', to: '/admin/applications', icon: ClipboardList },
    { label: 'Documents', to: '/admin/documents', icon: FolderOpen },
    { label: 'Reports', to: '/admin/reports', icon: FileText,},
    { label: 'Profile', to: '/admin/profile', icon: User },
  ],
  [USER_ROLES.HR]: [
    { label: 'Dashboard', to: '/hr/dashboard', icon: LayoutDashboard },
    { label: 'Calls', to: '/hr/calls', icon: PhoneCall },
    { label: 'Applications', to: '/hr/applications', icon: ClipboardList },
    { label: 'Profile', to: '/hr/profile', icon: User }

  ],
  [USER_ROLES.MANAGER]: [
  { label: 'Dashboard', to: '/manager/dashboard', icon: LayoutDashboard },
  { label: 'Applications', to: '/manager/applications', icon: ClipboardList },
  { label: 'Evaluations', to: '/manager/evaluations', icon: FileCheck },
  ],
  [USER_ROLES.EVALUATOR]: [
    { label: 'Dashboard', to: '/evaluator/dashboard', icon: LayoutDashboard },
    { label: 'Assigned Applications', to: '/evaluator/assigned-applications', icon: ClipboardList },
    { label: 'Evaluations', to: '/evaluator/evaluations', icon: FileCheck },
  ],
};

/**
 * Candidate top-navigation (careers-portal style, no sidebar).
 */
export const CANDIDATE_NAV = [
  { label: 'Home', to: '/candidate/dashboard', icon: Home },
  { label: 'Available Calls', to: '/candidate/calls', icon: Search },
  { label: 'My Applications', to: '/candidate/applications', icon: Send },
  { label: 'Profile', to: '/candidate/profile', icon: User },
];

/** Resolve the employee nav for a role (empty array if none). */
export const getEmployeeNav = (role) => EMPLOYEE_NAV[role] || [];
