import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Send,
  FolderOpen,
  ArrowRight,
  Briefcase,
  Clock,
  CheckCircle,
} from 'lucide-react';

import useAuth from '../../hooks/useAuth';
import candidateService from '../../services/candidateService';

const defaultDashboard = {
  openCalls: 0,
  totalApplications: 0,
  underReviewApplications: 0,
  acceptedApplications: 0,
  averageScore: 0,
  activeCalls: [],
  recentApplications: [],
};

const STATUS_STYLES = {
  SUBMITTED: 'bg-blue-50 text-blue-700',
  UNDER_REVIEW: 'bg-amber-50 text-amber-700',
  SHORTLISTED: 'bg-gray-100 text-gray-700',
  ACCEPTED: 'bg-green-50 text-green-700',
  REJECTED: 'bg-red-50 text-red-700',
};

const StatusBadge = ({ status }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'
    }`}
  >
    {status ? status.replace('_', ' ') : '—'}
  </span>
);

const CandidateHome = () => {
  const { user } = useAuth();

  const firstName = user?.firstName || (user?.name || '').split(' ')[0];

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(defaultDashboard);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await candidateService.getDashboard(user.userId);
      setDashboard({ ...defaultDashboard, ...data });
    } catch (err) {
      console.error(err);
      setDashboard(defaultDashboard);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: 'Open Calls', value: dashboard.activeCalls.length, icon: Briefcase },
    { title: 'Applications', value: dashboard.totalApplications, icon: Send },
    { title: 'Under Review', value: dashboard.underReviewApplications, icon: Clock },
    { title: 'Accepted', value: dashboard.acceptedApplications, icon: CheckCircle },
    {
      title: 'Average Score',
      value: dashboard.averageScore ? Number(dashboard.averageScore).toFixed(1) : '—',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary to-primary-800 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Attijariwafa Bank Careers
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Welcome{firstName ? `, ${firstName}` : ''}.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
            Explore open opportunities, submit your applications, and track every step of your
            recruitment journey.
          </p>

          <Link
            to="/candidate/calls"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5 hover:bg-gray-50"
          >
            <Search size={18} />
            Browse Calls
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">
        {/* Statistics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h2 className="mt-2 text-3xl font-bold tabular-nums text-gray-900">
                    {loading ? '...' : stat.value}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                  <stat.icon size={22} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Calls */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">Latest Open Calls</h2>
            <Link
              to="/candidate/calls"
              className="flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              <p className="p-6 text-gray-400">Loading...</p>
            ) : dashboard.activeCalls.length === 0 ? (
              <p className="p-6 text-gray-500">No open calls available.</p>
            ) : (
              dashboard.activeCalls.map((call) => (
                <div
                  key={call.callId}
                  className="flex items-center justify-between p-6 transition-colors hover:bg-gray-50/60"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{call.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Closing:{' '}
                        {call.closingDate
                          ? new Date(call.closingDate).toLocaleDateString()
                          : '—'}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/candidate/calls/${call.callId}`}
                    className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                  >
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
            <Link
              to="/candidate/applications"
              className="flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              <p className="p-6 text-gray-400">Loading...</p>
            ) : dashboard.recentApplications.length === 0 ? (
              <p className="p-6 text-gray-500">You haven't submitted any applications yet.</p>
            ) : (
              dashboard.recentApplications.map((application) => (
                <div
                  key={application.applicationId}
                  className="flex items-center justify-between p-6 transition-colors hover:bg-gray-50/60"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{application.callTitle}</h3>
                    <div className="mt-1.5">
                      <StatusBadge status={application.status} />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Score</p>
                    <p className="text-lg font-bold text-primary">
                      {application.finalScore ?? '—'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { to: '/candidate/calls', icon: Search, title: 'Browse Calls', desc: 'Discover new opportunities.' },
            { to: '/candidate/applications', icon: Send, title: 'My Applications', desc: 'Track your recruitment progress.' },
            { to: '/candidate/documents', icon: FolderOpen, title: 'My Documents', desc: 'Manage your CV and certificates.' },
          ].map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-500">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateHome;