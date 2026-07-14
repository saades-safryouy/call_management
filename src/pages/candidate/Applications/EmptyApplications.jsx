import { Link } from 'react-router-dom';
import { Send, Search } from 'lucide-react';

const EmptyApplications = () => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary">
        <Send size={36} />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-gray-900">No applications yet</h2>
      <p className="mx-auto mt-3 max-w-md text-gray-500">
        You haven't submitted any applications yet. Browse our available opportunities and start
        your recruitment journey.
      </p>
      <Link
        to="/candidate/calls"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
      >
        <Search size={18} />
        Browse Available Calls
      </Link>
    </div>
  );
};

export default EmptyApplications;