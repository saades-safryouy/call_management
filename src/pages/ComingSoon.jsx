import React from 'react';
import { Construction, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';

/**
 * Temporary placeholder for portals/pages not yet implemented.
 * Kept minimal and honest (no mock data) so authenticated users are never
 * trapped in a redirect loop while the corresponding portal is being built.
 */
const ComingSoon = ({ title = 'Portal under construction' }) => {
  const { logout, user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary">
        <Construction className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        {user?.name || user?.email
          ? `Signed in as ${user.name || user.email} (${user.role}).`
          : ''}{' '}
        This section is not available yet.
      </p>
      <button
        onClick={logout}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-600 active:scale-[0.98]"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
};

export default ComingSoon;
