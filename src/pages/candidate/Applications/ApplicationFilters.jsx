import { Search } from 'lucide-react';

const ApplicationFilters = ({ search, status, onSearch, onStatusChange }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by job title..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-red-100"
          />
        </div>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-red-100"
        >
          <option value="">All Status</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="SHORTLISTED">Shortlisted</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default ApplicationFilters;