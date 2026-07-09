import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import SearchBar from '../../../components/ui/SearchBar';
import callService from '../../../services/callService';
import useToast from '../../../hooks/useToast';
import CallDetailsModal from './CallDetailsModal';
import CallsTable from './CallsTable';

const PAGE_SIZE = 8;
const STATUS_OPTIONS = ['ALL', 'OPEN', 'ACTIVE', 'CLOSED', 'DRAFT'];

const CallsPage = () => {
  const toast = useToast();

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [page, setPage] = useState(1);

  const [selectedCall, setSelectedCall] = useState(null);

  const fetchCalls = useCallback(async () => {
    try {
      setLoading(true);

      const data = await callService.getAll();

      setCalls(Array.isArray(data) ? data : data.content || []);
    } catch (error) {
      toast.error(error.userMessage || 'Failed to load calls.');
      setCalls([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCalls();
  }, [fetchCalls]);

  const filteredCalls = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return calls.filter((call) => {
      const matchesStatus =
        statusFilter === 'ALL' || call.status === statusFilter;

      const matchesSearch =
        !q ||
        [call.title, call.description, call.status, call.createdByEmail]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [calls, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCalls.length / PAGE_SIZE));

  const currentPage = Math.min(page, totalPages);

  const pagedCalls = filteredCalls.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Calls" subtitle="Browse all calls for applications." />

      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          className="w-full sm:w-96"
          value={searchQuery}
          placeholder="Search calls..."
          onChange={(value) => {
            setSearchQuery(value);
            setPage(1);
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 transition-colors hover:border-gray-300 focus:border-gray-400 focus:outline-none"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === 'ALL' ? 'All Statuses' : status}
            </option>
          ))}
        </select>
      </div>

      <CallsTable
        calls={pagedCalls}
        loading={loading}
        page={currentPage}
        pageSize={PAGE_SIZE}
        total={filteredCalls.length}
        hasCalls={calls.length > 0}
        onPageChange={setPage}
        onView={setSelectedCall}
      />

      <CallDetailsModal
        open={Boolean(selectedCall)}
        call={selectedCall}
        onClose={() => setSelectedCall(null)}
      />
    </div>
  );
};

export default CallsPage;