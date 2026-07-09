import React from 'react';
import { Edit2, Eye, Trash2, UserPlus, Users as UsersIcon } from 'lucide-react';
import Badge, { roleColor, statusColor } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import Pagination from '../../../components/ui/Pagination';
import { SkeletonTableRows } from '../../../components/ui/Skeleton';

const getUserId = (user) => user?.userId ?? user?.id;

const getFullName = (user) =>
  `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

const UsersTable = ({
  users = [],
  loading = false,
  page = 1,
  pageSize = 8,
  total = 0,
  hasUsers = false,
  onPageChange,
  onCreate,
  onView,
  onEdit,
  onDelete,
}) => {
  const showEmpty = !loading && users.length === 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <SkeletonTableRows rows={pageSize} cols={4} />
            ) : (
              users.map((user) => {
                const fullName = getFullName(user);
                const userId = getUserId(user);

                return (
                  <tr key={userId} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 font-bold text-primary">
                          {(fullName || user.email || 'U').substring(0, 1).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="font-semibold text-gray-900">{fullName || '-'}</div>
                          <div className="text-gray-500">{user.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge color={roleColor(user.roleName || user.role)}>
                        {user.roleName || user.role || '-'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge color={user.enabled ? statusColor('ACTIVE') : 'gray'}>
                        {user.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onView?.(user)}
                          className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit?.(user)}
                          className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-primary-50 hover:text-primary"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete?.(user)}
                          className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-primary-50 hover:text-primary"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showEmpty && (
        <EmptyState
          icon={UsersIcon}
          title={hasUsers ? 'No matching users' : 'No users yet'}
          description={
            hasUsers ? 'Try adjusting your search or role filter.' : 'Get started by adding the first user.'
          }
          action={
            !hasUsers ? (
              <Button icon={UserPlus} onClick={onCreate}>
                Add User
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

export default UsersTable;
