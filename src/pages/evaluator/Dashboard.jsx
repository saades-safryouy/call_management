import React from 'react';
import { ClipboardList, CheckCircle, Clock, FileText } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import EmptyState from '../../components/ui/EmptyState';

// Placeholder metrics — wired to real data in the Evaluator business modules.
const stats = [
  { name: 'Pending Evaluations', value: '—', icon: Clock, accent: 'amber' },
  { name: 'Completed', value: '—', icon: CheckCircle, accent: 'green' },
  { name: 'Total Assigned', value: '—', icon: ClipboardList, accent: 'blue' },
  { name: 'Average Score', value: '—', icon: FileText, accent: 'primary' },
];

const EvaluatorDashboard = () => (
  <div className="space-y-6">
    <PageHeader
      title="Evaluator Dashboard"
      subtitle="Review and evaluate candidate applications efficiently."
    />

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.name} icon={stat.icon} label={stat.name} value={stat.value} accent={stat.accent} />
      ))}
    </div>

    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900">Pending Evaluations</h3>
      </div>
      <EmptyState
        icon={ClipboardList}
        title="No assigned evaluations"
        description="Applications assigned to you for evaluation will appear here."
      />
    </div>
  </div>
);

export default EvaluatorDashboard;
