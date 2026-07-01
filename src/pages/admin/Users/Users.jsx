import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, Edit2, Trash2, UserPlus, Users as UsersIcon } from 'lucide-react';
import userService from '../../../services/userService';
import useToast from '../../../hooks/useToast';
import useConfirm from '../../../hooks/useConfirm';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import PageHeader from '../../../components/ui/PageHeader';
import SearchBar from '../../../components/ui/SearchBar';
import Badge, { roleColor, statusColor } from '../../../components/ui/Badge';
import { SkeletonTableRows } from '../../../components/ui/Skeleton';
import { USER_ROLES } from '../../../utils/constants';
import UserFormModal from './UserFormModal';
import UserDetailsModal from './UserDetailsModal';

const PAGE_SIZE = 8;
const ROLE_OPTIONS = Object.values(USER_ROLES);

const UsersPage = () => {
  const toast = useToast();
  const confirm = useConfirm();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { type: 'create'|'edit'|'details', user }

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await userService.getAll();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(error.userMessage || 'Failed to load users.');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter((u) => {
      const matchesRole = roleFilter === 'ALL' || u.roleName === roleFilter;
      const matchesQuery =
        !q ||
        [u.firstName, u.lastName, u.email, u.roleName]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q));
      return matchesRole && matchesQuery;
    });
  }, [users, searchQuery, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedUsers = filteredUsers.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleDelete = async (user) => {
    const ok = await confirm({
      title: 'Delete user',
      message: `Are you sure you want to permanently delete ${user.email}? This action cannot be undone.`,
      confirmText: 'Delete',
      variant: 'danger',
    });
    if (!ok) return;
    try {
      await userService.remove(user.userId);
      toast.success('User deleted successfully.');
      fetchUsers();
    } catch (error) {
      toast.error(error.userMessage || 'Failed to delete user.');
    }
  };

  const hasUsers = users.length > 0;
  const showEmpty = !isLoading && filteredUsers.length === 0;

  return (
    <div className="space-y-6">
      <PageHeader title="User Management" subtitle="Manage system users and their roles">
        <Button icon={UserPlus} onClick={() => setModal({ type: 'create' })}>
          Add User
        </Button>
      </PageHeader>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          className="w-full sm:w-96"
          value={searchQuery}
          onChange={(v) => {
            setSearchQuery(v);
            setPage(1);
          }}
          placeholder="Search by name, email or role..."
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="ALL">All roles</option>
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Users Table */}
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
              {isLoading ? (
                <SkeletonTableRows rows={PAGE_SIZE} cols={4} />
              ) : (
                pagedUsers.map((user) => {
                  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
                  return (
                    <tr key={user.userId} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 font-bold text-primary">
                            {(fullName || user.email || 'U').substring(0, 1).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="font-semibold text-gray-900">{fullName || '—'}</div>
                            <div className="text-gray-500">{user.email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge color={roleColor(user.roleName)}>{user.roleName || '—'}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge color={user.enabled ? statusColor('ACTIVE') : 'gray'}>
                          {user.enabled ? 'Active' : 'Disabled'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setModal({ type: 'details', user })}
                            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setModal({ type: 'edit', user })}
                            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-primary-50 hover:text-primary"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
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
                <Button icon={UserPlus} onClick={() => setModal({ type: 'create' })}>
                  Add User
                </Button>
              ) : null
            }
          />
        )}

        {!isLoading && filteredUsers.length > 0 && (
          <Pagination page={safePage} pageSize={PAGE_SIZE} total={filteredUsers.length} onPageChange={setPage} />
        )}
      </div>

      {/* Modals */}
      <UserFormModal
        open={modal?.type === 'create' || modal?.type === 'edit'}
        mode={modal?.type}
        user={modal?.user}
        onClose={() => setModal(null)}
        onSaved={fetchUsers}
      />
      <UserDetailsModal
        open={modal?.type === 'details'}
        user={modal?.user}
        onClose={() => setModal(null)}
      />
    </div>
  );
};

export default UsersPage;
