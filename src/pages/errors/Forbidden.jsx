import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { getRoleHomePath } from '../../utils/constants';

/**
 * 403 — Access Denied.
 */
const Forbidden = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Error 403</p>
      <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 text-primary">
        <ShieldAlert className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Access denied</h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        You don&apos;t have permission to view this page. If you believe this is a mistake,
        contact your administrator.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {isAuthenticated ? (
          <button
            onClick={() => navigate(getRoleHomePath(user?.role), { replace: true })}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-600 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to my dashboard
          </button>
        ) : (
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-600 active:scale-[0.98]"
          >
            Go to login
          </button>
        )}
        {isAuthenticated && (
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        )}
      </div>
    </div>
  );
};

export default Forbidden;
