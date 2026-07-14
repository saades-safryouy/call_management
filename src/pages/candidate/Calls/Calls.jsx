import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar, ArrowRight, Sparkles } from 'lucide-react';

import callService from '../../../services/callService';

import Loading from '../../../components/common/Loading';
import EmptyState from '../../../components/ui/EmptyState';
import CallFilters from './CallFilters';

const daysUntil = (date) => {
  if (!date) return null;
  return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
};

const isNew = (date) => {
  if (!date) return false;
  const posted = Math.ceil((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
  return posted <= 5;
};

const ClosingBadge = ({ date }) => {
  const days = daysUntil(date);

  if (days === null) {
    return (
      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
        —
      </span>
    );
  }

  if (days <= 3) {
    return (
      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
        {days <= 0 ? 'Closing today' : `${days}d left`}
      </span>
    );
  }

  if (days <= 7) {
    return (
      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
        {days}d left
      </span>
    );
  }

  return (
    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
      {new Date(date).toLocaleDateString()}
    </span>
  );
};

const CandidateCalls = () => {
  const [calls, setCalls] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCalls();
  }, []);

  const loadCalls = async () => {
    try {
      setLoading(true);

      const data = await callService.getActive();

      setCalls(Array.isArray(data) ? data : data.content || []);
    } catch (error) {
      console.error(error);
      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCalls = useMemo(() => {
    return calls
      .filter((call) => (call.title || '').toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.openingDate || 0) - new Date(a.openingDate || 0));
  }, [calls, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Careers</p>
          <h1 className="mt-2 text-4xl font-bold">Available Opportunities</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Discover the latest career opportunities at Attijariwafa Bank. Find the position that
            matches your skills and apply online.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {/* Search */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <CallFilters search={search} onSearch={setSearch} />
        </div>

        {/* Result count */}
        {!loading && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
            <span className="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary">
              {filteredCalls.length} position{filteredCalls.length !== 1 && 's'}
            </span>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <Loading />
        ) : filteredCalls.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12">
            <EmptyState
              icon={Briefcase}
              title="No opportunities found"
              description="Try changing your search or check back later for new openings."
            />
          </div>
        ) : (
          // Dense job-board list, Rekrute-style rows instead of a card grid
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="divide-y divide-gray-100">
              {filteredCalls.map((call) => (
                <Link
                  key={call.callId}
                  to={`/candidate/calls/${call.callId}`}
                  className="group flex items-center gap-4 p-5 transition-colors hover:bg-gray-50/70"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <Briefcase size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-base font-bold text-gray-900 group-hover:text-primary">
                        {call.title}
                      </h3>

                      {isNew(call.openingDate) && (
                        <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                          <Sparkles size={11} />
                          New
                        </span>
                      )}

                      <ClosingBadge date={call.closingDate} />
                    </div>

                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                      {call.description || 'No description provided.'}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar size={13} />
                      Posted{' '}
                      {call.openingDate ? new Date(call.openingDate).toLocaleDateString() : '—'}
                    </div>
                  </div>

                  <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-primary-700">
                    View
                    <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateCalls;