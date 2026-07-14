import { Calendar, User, Star, Eye } from 'lucide-react';
import ApplicationStatusBadge from './ApplicationStatusBadge';

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : '—');

const ApplicationCard = ({ application, onView }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-primary-50 to-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{application.callTitle}</h3>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>Applied on {formatDate(application.submissionDate)}</span>
            </div>
          </div>

          <ApplicationStatusBadge status={application.status} />
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-100 p-2">
            <User className="h-5 w-5 text-gray-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Evaluator</p>
            <p className="font-medium text-gray-900">
              {application.evaluatorEmail || 'Not assigned'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-50 p-2">
            <Star className="h-5 w-5 text-amber-500" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Final Score</p>
            <p className="text-lg font-bold text-gray-900">
              {application.finalScore != null ? application.finalScore : 'Pending'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50 px-6 py-4">
        <button
          onClick={() => onView(application)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Eye size={18} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;