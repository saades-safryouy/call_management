import React, { useEffect, useState } from 'react';
import {
  Users,
  PhoneCall,
  ClipboardList,
  CheckCircle,
  FileText,
  RefreshCw,
  Server,
  Database,
  ShieldCheck,
  Lock,
} from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import dashboardService from '../../services/dashboardService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    calls: 0,
    applications: 0,
    evaluations: 0,
    documents: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await dashboardService.getStatistics();

      setStats(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
      setError('Could not refresh statistics.');
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { name: 'Users', value: stats.users, icon: Users, accent: 'primary' },
    { name: 'Calls', value: stats.calls, icon: PhoneCall, accent: 'blue' },
    { name: 'Applications', value: stats.applications, icon: ClipboardList, accent: 'purple' },
    { name: 'Evaluations', value: stats.evaluations, icon: CheckCircle, accent: 'green' },
    { name: 'Documents', value: stats.documents, icon: FileText, accent: 'blue' },
  ];

  const summaryRows = [
    { label: 'Total Users', value: stats.users, icon: Users },
    { label: 'Calls', value: stats.calls, icon: PhoneCall },
    { label: 'Applications', value: stats.applications, icon: ClipboardList },
    { label: 'Evaluations', value: stats.evaluations, icon: CheckCircle },
    { label: 'Documents', value: stats.documents, icon: FileText },
  ];

  const statusRows = [
    { label: 'Backend API', value: 'Online', icon: Server },
    { label: 'Database', value: 'Connected', icon: Database },
    { label: 'Authentication', value: 'Active', icon: ShieldCheck },
    { label: 'JWT Security', value: 'Enabled', icon: Lock },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Admin Dashboard" subtitle="System overview and statistics.">
        <div className="flex items-center gap-3">
          {lastUpdated && !loading && (
            <span className="text-xs text-gray-400">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}

          <button
            type="button"
            onClick={loadStatistics}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-green-600">System Online</span>
          </div>
        </div>
      </PageHeader>

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <StatCard
            key={card.name}
            icon={card.icon}
            label={card.name}
            value={loading ? '...' : card.value}
            accent={card.accent}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-base font-bold text-gray-900">System Summary</h2>

          <div className="divide-y divide-gray-100">
            {summaryRows.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Icon className="h-4 w-4 text-gray-400" />
                  {label}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {loading ? '...' : value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-base font-bold text-gray-900">System Status</h2>

          <div className="divide-y divide-gray-100">
            {statusRows.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Icon className="h-4 w-4 text-gray-400" />
                  {label}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;