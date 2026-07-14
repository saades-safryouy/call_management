import { Link } from 'react-router-dom';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const CallCard = ({ call }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{call.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-gray-600">{call.description}</p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <Briefcase size={20} />
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          Closing:{' '}
          {call.closingDate ? new Date(call.closingDate).toLocaleDateString() : '—'}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          Attijariwafa Bank
        </div>
      </div>

      <Link
        to={`/candidate/calls/${call.callId}`}
        className="mt-6 block rounded-lg bg-primary py-3 text-center font-semibold text-white transition-colors hover:bg-primary-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default CallCard;