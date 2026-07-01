import React from 'react';
import { NavLink } from 'react-router-dom';
import { PhoneCall, LogOut, ChevronLeft, ChevronRight, X } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

/**
 * Employee sidebar — collapsible on desktop, slide-over drawer on mobile.
 */
const Sidebar = ({ nav, collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) => {
  const { user, logout } = useAuth();
  const initials = (user?.name || user?.email || 'U').substring(0, 2).toUpperCase();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden" onClick={onCloseMobile} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
              <PhoneCall className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <p className="text-sm font-extrabold text-gray-900">Attijariwafa</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                  Call Management
                </p>
              </div>
            )}
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `group flex items-center rounded-lg px-3 py-2.5 transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`
              }
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span className="text-sm font-semibold">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="mt-auto border-t border-gray-100 bg-gray-50/50 p-3">
          {!collapsed && (
            <div className="mb-3 flex items-center gap-3 px-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">{user?.name || user?.email}</p>
                <p className="text-xs font-medium uppercase tracking-tight text-gray-500">{user?.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="flex w-full items-center rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-primary hover:text-white"
            title="Sign out"
          >
            <LogOut className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
            {!collapsed && <span className="text-sm font-bold">Sign out</span>}
          </button>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-20 hidden h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 lg:flex"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
