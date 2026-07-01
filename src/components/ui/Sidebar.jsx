import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  ClipboardList,
  FileText
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout, user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Calls', href: '/calls', icon: PhoneCall },
    { name: 'Applications', href: '/applications', icon: ClipboardList },
    { name: 'Reports', href: '/reports', icon: FileText },
  ];

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } relative flex flex-col border-r bg-slate-900 transition-all duration-300 ease-in-out`}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between px-4">
        {isOpen ? (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
              <PhoneCall className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CallSync</span>
          </div>
        ) : (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
            <PhoneCall className="h-5 w-5 text-white" />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-100"
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-8 flex-1 space-y-2 px-3">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center rounded-lg px-3 py-2 transition-colors duration-200 ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
            {isOpen && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="mt-auto border-t border-slate-800 p-4">
        {isOpen && (
          <div className="mb-4 flex items-center space-x-3 px-2">
            <div className="h-8 w-8 rounded-full bg-orange-100 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {user?.username?.substring(0, 2).toUpperCase() || 'U'}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white truncate max-w-[140px]">
                {user?.username || 'User'}
              </span>
              <span className="text-xs text-gray-400">{user?.role || 'Guest'}</span>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={`flex w-full items-center rounded-lg px-3 py-2 text-gray-400 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-500`}
        >
          <LogOut className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
