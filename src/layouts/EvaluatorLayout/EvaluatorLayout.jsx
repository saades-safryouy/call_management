import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RoleSidebar from '../../components/layout/RoleSidebar';
import Navbar from '../../components/ui/Navbar';
import { 
  LayoutDashboard, 
  PhoneCall,
  ClipboardList,
  History
} from 'lucide-react';

const EvaluatorLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigation = [
    { name: 'Dashboard', href: '/evaluator/dashboard', icon: LayoutDashboard },
    { name: 'Assigned Calls', href: '/evaluator/calls', icon: PhoneCall },
    { name: 'My Evaluations', href: '/evaluator/evaluations', icon: ClipboardList },
    { name: 'History', href: '/evaluator/history', icon: History },
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

export default EvaluatorLayout;
