import React from 'react';
import { 
  Search, 
  Bell, 
  User as UserIcon, 
  Menu,
  ChevronDown
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="z-10 h-16 border-b bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Mobile Toggle & Search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all"
              placeholder="Rechercher..."
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-4">
          <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-50 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-gray-200"></div>

          <div className="flex items-center space-x-3">
            <div className="hidden flex-col text-right sm:flex">
              <span className="text-sm font-bold text-gray-900 leading-none">
                {user?.name || user?.username || 'Utilisateur'}
              </span>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider mt-1">
                {user?.role || 'Membre'}
              </span>
            </div>
            <button className="flex items-center space-x-1 rounded-lg p-1 hover:bg-gray-50 transition-all ring-1 ring-transparent hover:ring-gray-200">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-red-50 ring-2 ring-red-600/10">
                <div className="flex h-full w-full items-center justify-center bg-red-600 text-sm font-bold text-white shadow-inner">
                  {user?.username?.substring(0, 1).toUpperCase() || 'U'}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

