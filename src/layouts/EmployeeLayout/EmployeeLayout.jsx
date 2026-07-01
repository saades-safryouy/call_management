import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getEmployeeNav } from '../../config/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * EmployeeLayout — shared enterprise shell for Administrator, HR, Manager and
 * Evaluator. Sidebar navigation is derived from the authenticated user's role,
 * so only authorized items are ever shown.
 */
const EmployeeLayout = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = getEmployeeNav(user?.role);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        nav={nav}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
