import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner';
import { getRoleHomePath } from '../utils/constants';

/**
 * Protected Route
 * - Redirects unauthenticated users to /login.
 * - If `allowedRoles` is provided, users without a matching role are sent to
 *   their own role home (prevents cross-role access and redirect loops).
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role;
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={getRoleHomePath(userRole)} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
