import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RoleSidebar from '../../components/layout/RoleSidebar';
import Navbar from '../../components/ui/Navbar';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  PhoneCall,
  ClipboardList,
  FileText,
  Shield
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Role Management', href: '/admin/roles', icon: Shield },
    { name: 'Call Management', href: '/admin/calls', icon: PhoneCall },
    { name: 'Evaluations', href: '/admin/evaluations', icon: ClipboardList },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        navigation={navigation} 
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
