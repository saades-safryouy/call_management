import React, { useEffect, useState } from 'react';
import {
  ClipboardList,
  CheckCircle,
  Clock,
  FileText,
} from 'lucide-react';
import authService from '../../services/authService';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import EmptyState from '../../components/ui/EmptyState';

import dashboardService from '../../services/dashboardService';

const EvaluatorDashboard = () => {
  const [stats, setStats] = useState({
    pendingEvaluations: 0,
    completedEvaluations: 0,
    totalAssigned: 0,
    averageScore: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const currentUser = authService.getUser();

      const data = await dashboardService.getEvaluatorDashboard(
        currentUser.userId
      );

      setStats({
        pendingEvaluations: data.pendingEvaluations,
        completedEvaluations: data.completedEvaluations,
        totalAssigned: data.totalAssigned,
        averageScore: Number(data.averageScore || 0).toFixed(2),
      });
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };


  

  const cards = [
    {
      name: 'Pending Evaluations',
      value: loading ? '...' : stats.pendingEvaluations,
      icon: Clock,
      accent: 'amber',
    },
    {
      name: 'Completed',
      value: loading ? '...' : stats.completedEvaluations,
      icon: CheckCircle,
      accent: 'green',
    },
    {
      name: 'Total Assigned',
      value: loading ? '...' : stats.totalAssigned,
      icon: ClipboardList,
      accent: 'blue',
    },
    {
      name: 'Average Score',
      value: loading ? '...' : stats.averageScore,
      icon: FileText,
      accent: 'primary',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Evaluator Dashboard"
        subtitle="Review and evaluate candidate applications efficiently."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.name}
            icon={card.icon}
            label={card.name}
            value={card.value}
            accent={card.accent}
          />
        ))}
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">
            Evaluation Summary
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading dashboard...
          </div>
        ) : stats.pendingEvaluations > 0 ? (
          <div className="p-6">
            <p className="text-gray-700">
              You currently have{' '}
              <span className="font-bold text-amber-600">
                {stats.pendingEvaluations}
              </span>{' '}
              application(s) waiting for evaluation.
            </p>
          </div>
        ) : (
          <EmptyState
            icon={CheckCircle}
            title="All evaluations completed"
            description="You have evaluated all assigned applications."
          />
        )}
      </div>
    </div>
  );
};

export default EvaluatorDashboard;