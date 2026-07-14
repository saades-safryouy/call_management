import { useEffect, useMemo, useState } from 'react';
import { Briefcase, Calendar, ArrowRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import applicationService from '../../../services/applicationService';

import Loading from '../../../components/common/Loading';
import ApplicationFilters from './ApplicationFilters';
import ApplicationStatusBadge from './ApplicationStatusBadge';
import EmptyApplications from './EmptyApplications';

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-GB') : '—';

const CandidateApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const data = await applicationService.getMyApplications();

      setApplications(Array.isArray(data) ? data : data.content || []);
    } catch (error) {
      console.error(error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications
      .filter((application) => {
        const matchesSearch =
          !search ||
          application.callTitle
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          !status || application.status === status;

        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.submissionDate || 0) -
          new Date(a.submissionDate || 0)
      );
  }, [applications, search, status]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">

          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Recruitment Journey
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            My Applications
          </h1>

          <p className="mt-3 max-w-2xl text-white/90">
            Track the progress of all your submitted applications at
            Attijariwafa Bank.
          </p>

        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* Filters */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <ApplicationFilters
            search={search}
            status={status}
            onSearch={setSearch}
            onStatusChange={setStatus}
          />
        </div>

        {/* Result count */}

        {!loading && (
          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-gray-900">
              Submitted Applications
            </h2>

            <span className="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary">
              {filteredApplications.length} application
              {filteredApplications.length !== 1 && 's'}
            </span>

          </div>
        )}

        {/* Content */}

        {loading ? (
          <Loading />
        ) : filteredApplications.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12">
            <EmptyApplications />
          </div>
        ) : (
          <div className="space-y-5">

            {filteredApplications.map((application) => (

              <div
                key={application.applicationId}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex-1">

                    <h3 className="text-2xl font-bold text-gray-900">
                      {application.callTitle}
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-6 text-gray-600">

                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>
                          {formatDate(application.submissionDate)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Briefcase size={18} />
                        <ApplicationStatusBadge
                          status={application.status}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <FileText size={18} />
                        <span>
                          Score:{' '}
                          {application.finalScore ?? 'Pending'}
                        </span>
                      </div>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/candidate/applications/${application.applicationId}`
                      )
                    }
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default CandidateApplications;