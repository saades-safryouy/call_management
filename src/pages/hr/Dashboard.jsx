import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import useAuth from '../../hooks/useAuth';
import { getEmployeeNav } from '../../config/navigation';
import { USER_ROLES } from '../../utils/constants';

/**
 * HR Dashboard — quick-access hub built from the HR navigation config
 * (no mock data). Section detail pages arrive in later business modules.
 */
const HRDashboard = () => {
  const { user } = useAuth();
  const links = getEmployeeNav(USER_ROLES.HR).filter((i) => !i.to.endsWith('/dashboard'));

  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Dashboard"
        subtitle={`Welcome${user?.name ? `, ${user.name}` : ''}. Manage recruitment operations from here.`}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary-50 p-3 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-base font-bold text-gray-900">{item.label}</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HRDashboard;
