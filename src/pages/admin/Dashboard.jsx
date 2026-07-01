import React from 'react';
import {
  Users,
  PhoneCall,
  ClipboardList,
  CheckCircle,
  TrendingUp,
  Shield,
  Activity,
  Clock,
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';

// NOTE: figures below are placeholders pending the Admin analytics module
// (no aggregate stats endpoint exists on the backend yet).
const stats = [
  { name: 'Total Users', value: '—', icon: Users, accent: 'primary' },
  { name: 'Active Calls', value: '—', icon: PhoneCall, accent: 'blue' },
  { name: 'Applications', value: '—', icon: ClipboardList, accent: 'purple' },
  { name: 'Evaluations', value: '—', icon: CheckCircle, accent: 'green' },
];

const AdminDashboard = () => (
  <div className="space-y-6">
    <PageHeader title="Admin Overview" subtitle="System-wide statistics and management control panel.">
      <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm">
        <Activity className="h-4 w-4 text-primary" />
        <span>
          System Status: <span className="font-bold text-green-600">Optimal</span>
        </span>
      </div>
    </PageHeader>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.name} icon={stat.icon} label={stat.name} value={stat.value} accent={stat.accent} />
      ))}
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">System Activity Analytics</h3>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="flex h-64 items-center justify-center p-6">
          <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
            <div className="text-center">
              <Activity className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-sm font-medium text-gray-400">Analytics module coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">Security &amp; Logs</h3>
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div className="flex h-64 items-center justify-center p-6">
          <div className="text-center text-gray-400">
            <Clock className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-sm font-medium">Audit log module coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
