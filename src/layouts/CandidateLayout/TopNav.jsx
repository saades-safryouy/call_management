import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PhoneCall, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { CANDIDATE_NAV } from '../../config/navigation';

/**
 * Candidate top navigation — careers-portal style (no sidebar).
 */
const TopNav = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const initials = (user?.name || user?.email || 'U').substring(0, 1).toUpperCase();

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <PhoneCall className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-gray-900">Attijariwafa Bank</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Careers</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {CANDIDATE_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to.endsWith('dashboard')}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop profile */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition-all hover:bg-gray-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {initials}
              </div>
              <span className="max-w-[140px] truncate text-sm font-semibold text-gray-700">
                {user?.name || user?.email}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="truncate text-sm font-bold text-gray-900">{user?.name || 'Candidate'}</p>
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
              </>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <nav className="space-y-1 px-4 py-3">
            {CANDIDATE_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive ? 'bg-primary-50 text-primary' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNav;
