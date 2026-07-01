import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import EmptyState from '../../components/ui/EmptyState';
import Breadcrumbs from './Breadcrumbs';

/**
 * Employee top header — mobile menu toggle, breadcrumbs, notifications and
 * profile menu. Notifications intentionally show an empty state (no backend
 * notifications endpoint exists — no mock data).
 */
const Header = ({ onOpenMobile }) => {
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState(null); // 'notif' | 'profile' | null
  const initials = (user?.name || user?.email || 'U').substring(0, 1).toUpperCase();
  const toggle = (name) => setMenu((m) => (m === name ? null : name));

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => toggle('notif')}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          {menu === 'notif' && (
            <div className="absolute right-0 top-full z-40 mt-2 w-72 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
              <div className="border-b border-gray-100 px-4 py-3 text-sm font-bold text-gray-900">
                Notifications
              </div>
              <EmptyState title="No notifications" description="You're all caught up." className="py-8" />
            </div>
          )}
        </div>

        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => toggle('profile')}
            className="flex items-center gap-2 rounded-lg p-1 transition-all hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {initials}
            </div>
            <div className="hidden flex-col text-left sm:flex">
              <span className="text-sm font-bold leading-none text-gray-900">
                {user?.name || user?.email}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                {user?.role}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
          {menu === 'profile' && (
            <div className="absolute right-0 top-full z-40 mt-2 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="truncate text-sm font-bold text-gray-900">{user?.name || 'User'}</p>
                <p className="truncate text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click-away overlay */}
      {menu && <div className="fixed inset-0 z-30" onClick={() => setMenu(null)} />}
    </header>
  );
};

export default Header;
