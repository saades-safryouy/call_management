import { Calendar, Clock, Building2, Send, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import callService from '../../../services/callService';
import applicationService from '../../../services/applicationService';
import Loading from '../../../components/common/Loading';
import EmptyState from '../../../components/ui/EmptyState';
import useAuth from '../../../hooks/useAuth';
import ApplyDialog from './ApplyDialog';

const formatDate = (date) => (date ? new Date(date).toLocaleDateString('en-GB') : '—');

const STATUS_STYLES = {
  OPEN: 'bg-green-100 text-green-700',
  CLOSED: 'bg-red-100 text-red-700',
  DRAFT: 'bg-amber-100 text-amber-700',
};

const CallDetails = () => {
  const { callId } = useParams();
  const { user } = useAuth();

  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);

  const [applying, setApplying] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState('');
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const loadCall = async () => {
      try {
        setLoading(true);
        const data = await callService.getById(callId);
        setCall(data);
      } catch (err) {
        console.error(err);
        setCall(null);
      } finally {
        setLoading(false);
      }
    };

    if (callId) {
      loadCall();
    }
  }, [callId]);

  const handleApply = async () => {
    setError('');

    try {
      setApplying(true);
      await applicationService.create({
        callId: Number(callId),
        candidateId: user.userId,
      });

      setApplied(true);
      setConfirmOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit application.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!call) {
    return (
      <EmptyState
        title="Call not found"
        description="The requested job offer could not be found."
      />
    );
  }

  const statusStyle = STATUS_STYLES[call.status] || 'bg-gray-100 text-gray-600';
  const isOpen = call.status === 'OPEN';

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">
          {/* Header */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}>
              {call.status}
            </span>

            <h1 className="mt-5 text-4xl font-bold text-gray-900">{call.title}</h1>

            <div className="mt-3 flex items-center gap-2 text-gray-500">
              <Building2 size={18} />
              <span>Attijariwafa Bank</span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar size={18} />
                  <span className="font-semibold">Opening Date</span>
                </div>
                <p className="mt-2 text-gray-700">{formatDate(call.openingDate)}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Clock size={18} />
                  <span className="font-semibold">Closing Date</span>
                </div>
                <p className="mt-2 text-gray-700">{formatDate(call.closingDate)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Job Description</h2>
            <p className="whitespace-pre-line leading-8 text-gray-700">{call.description}</p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-900">Job Summary</h2>

            <div className="mt-6 space-y-6">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold ${statusStyle}`}>
                  {call.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Opening Date</p>
                <p className="mt-1 font-medium">{formatDate(call.openingDate)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Closing Date</p>
                <p className="mt-1 font-medium">{formatDate(call.closingDate)}</p>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            {applied ? (
              <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-green-50 px-5 py-3 font-semibold text-green-700">
                <CheckCircle size={18} />
                Application submitted
              </div>
            ) : (
              <button
                onClick={() => setConfirmOpen(true)}
                disabled={!isOpen || applying}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={18} />
                {isOpen ? 'Apply Now' : 'Applications Closed'}
              </button>
            )}
          </div>
        </div>
      </div>

      <ApplyDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onApply={handleApply}
        loading={applying}
      />
    </div>
  );
};

export default CallDetails;