import React from 'react';
import { PhoneCall, Users, ClipboardList, TrendingUp, Clock } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import EmptyState from '../../components/ui/EmptyState';

// Placeholder metrics — wired to real data in the Manager business modules.
const stats = [
  { name: 'Active Calls', value: '—', icon: PhoneCall, accent: 'primary' },
  { name: 'Team Members', value: '—', icon: Users, accent: 'blue' },
  { name: 'Pending Reviews', value: '—', icon: ClipboardList, accent: 'amber' },
  { name: 'Completion Rate', value: '—', icon: TrendingUp, accent: 'green' },
];

const ManagerDashboard = () => (
  <div className="space-y-6">
    <PageHeader title="Manager Dashboard" subtitle="Overview of calls, reviews and team activity.">
      <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm">
        <Clock className="h-4 w-4 text-primary" />
        <span>Overview</span>
      </div>
    </PageHeader>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.name} icon={stat.icon} label={stat.name} value={stat.value} accent={stat.accent} />
      ))}
    </div>

    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
      </div>
      <EmptyState icon={ClipboardList} title="No activity yet" description="Review and decision activity will appear here." />
    </div>
  </div>
);

export default ManagerDashboard;
