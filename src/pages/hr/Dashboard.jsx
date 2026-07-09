import { useEffect, useState } from 'react';
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Users,
} from 'lucide-react';

import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import StatCard from '../../components/ui/StatCard';

import dashboardService from '../../services/dashboardService';
import applicationService from '../../services/applicationService';
import callService from '../../services/callService';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    calls: 0,
    applications: 0,
    openCalls: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const dashboard = await dashboardService.getStatistics();
      const calls = await callService.getAll();
      const applications = await applicationService.getAll();

      const openCalls = calls.filter(
        (c) => c.status === 'OPEN'
      ).length;

      const underReview = applications.filter(
        (a) => a.status === 'UNDER_REVIEW'
      ).length;

      const accepted = applications.filter(
        (a) => a.status === 'ACCEPTED'
      ).length;

      const rejected = applications.filter(
        (a) => a.status === 'REJECTED'
      ).length;

      setStats({
        calls: dashboard.calls,
        applications: dashboard.applications,
        openCalls,
        underReview,
        accepted,
        rejected,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="HR Dashboard"
        subtitle="Recruitment overview and application monitoring."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

        <StatCard
          icon={Briefcase}
          label="Total Calls"
          value={stats.calls}
          accent="primary"
        />

        <StatCard
          icon={Clock}
          label="Open Calls"
          value={stats.openCalls}
          accent="blue"
        />

        <StatCard
          icon={FileText}
          label="Applications"
          value={stats.applications}
          accent="purple"
        />

        <StatCard
          icon={Users}
          label="Under Review"
          value={stats.underReview}
          accent="yellow"
        />

        <StatCard
          icon={CheckCircle}
          label="Accepted"
          value={stats.accepted}
          accent="green"
        />

        <StatCard
          icon={XCircle}
          label="Rejected"
          value={stats.rejected}
          accent="red"
        />

      </div>
    </div>
  );
}