import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RoleSidebar from '../../components/layout/RoleSidebar';
import Navbar from '../../components/ui/Navbar';
import { 
  LayoutDashboard, 
  PhoneCall,
  Users,
  ClipboardList,
  FileText
} from 'lucide-react';

const ManagerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigation = [
    { name: 'Dashboard', href: '/manager/dashboard', icon: LayoutDashboard },
    { name: 'Call Management', href: '/manager/calls', icon: PhoneCall },
    { name: 'Team Monitoring', href: '/manager/team', icon: Users },
    { name: 'Evaluations', href: '/manager/evaluations', icon: ClipboardList },
    { name: 'Reports', href: '/manager/reports', icon: FileText },
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

export default ManagerLayout;
