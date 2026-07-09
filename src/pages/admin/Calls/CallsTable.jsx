import React from 'react';
import { Edit2, Eye, PhoneCall, Plus, Trash2 } from 'lucide-react';
import Badge, { statusColor } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import Pagination from '../../../components/ui/Pagination';
import { SkeletonTableRows } from '../../../components/ui/Skeleton';

const getCallId = (call) => call?.callId ?? call?.id;

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const CallsTable = ({
  calls = [],
  loading = false,
  page = 1,
  pageSize = 8,
  total = 0,
  hasCalls = false,
  onPageChange,
  onCreate,
  onView,
  onEdit,
  onDelete,
}) => {
  const showEmpty = !loading && calls.length === 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Call
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Opening
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Closing
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <SkeletonTableRows rows={pageSize} cols={5} />
            ) : (
              calls.map((call) => (
                <tr key={getCallId(call)} className="group transition-colors hover:bg-gray-50/80">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{call.title || '—'}</div>
                    <div className="mt-0.5 line-clamp-1 max-w-md text-xs text-gray-500">
                      {call.description || 'No description'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(call.openingDate)}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(call.closingDate)}</td>
                  <td className="px-6 py-4">
                    <Badge color={statusColor(call.status)}>{call.status || '—'}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                      <button
                        type="button"
                        onClick={() => onView?.(call)}
                        className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit?.(call)}
                        className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        title="Edit call"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete?.(call)}
                        className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete call"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showEmpty && (
        <EmptyState
          icon={PhoneCall}
          title={hasCalls ? 'No matching calls' : 'No calls yet'}
          description={hasCalls ? 'Try adjusting your filters.' : 'Create the first call for applications.'}
          action={
            !hasCalls ? (
              <Button icon={Plus} onClick={onCreate}>
                Add Call
              </Button>
            ) : null
          }
        />
      )}

      {!loading && total > 0 && (
        <Pagination page={page} pageSize={pageSize} total={total} onPageChange={onPageChange} />
      )}
    </div>
  );
};

export default CallsTable;