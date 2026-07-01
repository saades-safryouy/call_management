import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const RoleSidebar = ({ isOpen, toggleSidebar, navigation }) => {
  const { logout, user } = useAuth();

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } relative flex flex-col border-r bg-white transition-all duration-300 ease-in-out shadow-sm`}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {isOpen ? (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
              <PhoneCall className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CallSync</span>
          </div>
        ) : (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
            <PhoneCall className="h-5 w-5 text-white" />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 z-10"
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex-1 space-y-1 px-3">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center rounded-lg px-3 py-2.5 transition-all duration-200 ${
                isActive
                  ? 'bg-red-50 text-red-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
              }`
            }
          >
            <item.icon className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
            {isOpen && <span className="text-sm font-semibold">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="mt-auto border-t border-gray-100 p-4 bg-gray-50/50">
        {isOpen && (
          <div className="mb-4 flex items-center space-x-3 px-2">
            <div className="h-9 w-9 rounded-full bg-primary-100 p-1 ring-2 ring-primary/10">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-sm">
                {(user?.name || user?.email || 'U').substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-900 truncate">
                {user?.name || user?.email || 'User'}
              </span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">{user?.role || 'Guest'}</span>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={`group flex w-full items-center rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-md active:scale-95`}
        >
          <LogOut className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
          {isOpen && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default RoleSidebar;

