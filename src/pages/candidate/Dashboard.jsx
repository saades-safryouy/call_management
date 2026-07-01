import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Send, FolderOpen, ArrowRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const SHORTCUTS = [
  {
    to: '/candidate/calls',
    icon: Search,
    title: 'Explore opportunities',
    text: 'Browse open calls for applications across Attijariwafa Bank.',
  },
  {
    to: '/candidate/applications',
    icon: Send,
    title: 'Track your applications',
    text: 'Follow the status of every application you have submitted.',
  },
  {
    to: '/candidate/documents',
    icon: FolderOpen,
    title: 'Manage your documents',
    text: 'Keep your CV and supporting documents ready to apply.',
  },
];

/**
 * Candidate Home — careers-portal landing with a hero section (no mock data).
 */
const CandidateHome = () => {
  const { user } = useAuth();
  const firstName = user?.firstName || (user?.name || '').split(' ')[0];

  return (
    <div>
      {/* Hero (full-bleed) */}
      <section className="bg-gradient-to-br from-primary-700 via-primary to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Attijariwafa Bank Careers
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {firstName ? `Welcome, ${firstName}.` : 'Welcome.'} Build your career with us.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90">
            Discover open positions, apply in a few clicks, and track your applications — all in one place.
          </p>
          <Link
            to="/candidate/calls"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <Search className="h-4 w-4" />
            Browse available calls
          </Link>
        </div>
      </section>

      {/* Shortcuts */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SHORTCUTS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{s.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                Go
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CandidateHome;
