import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { getRoleHomePath } from '../../utils/constants';

/**
 * 404 — Page Not Found.
 */
const NotFound = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const goHome = () => {
    navigate(isAuthenticated ? getRoleHomePath(user?.role) : '/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Error 404</p>
      <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 text-primary">
        <Compass className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <button
        onClick={goHome}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-600 active:scale-[0.98]"
      >
        <ArrowLeft className="h-4 w-4" />
        {isAuthenticated ? 'Back to my dashboard' : 'Go to login'}
      </button>
    </div>
  );
};

export default NotFound;
