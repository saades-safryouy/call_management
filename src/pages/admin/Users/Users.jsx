import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';
import Button from '../../../components/ui/Button';
import PageHeader from '../../../components/ui/PageHeader';
import SearchBar from '../../../components/ui/SearchBar';
import userService from '../../../services/userService';
import useToast from '../../../hooks/useToast';
import { USER_ROLES } from '../../../utils/constants';
import UserDeleteDialog from './UserDeleteDialog';
import UserDetailsModal from './UserDetailsModal';
import UserFormModal from './UserFormModal';
import UsersTable from './UsersTable';

const PAGE_SIZE = 8;
const ROLE_OPTIONS = Object.values(USER_ROLES);

const getUserId = (user) => user?.userId ?? user?.id;

const UsersPage = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(Array.isArray(data) ? data : data?.content || []);
    } catch (error) {
      toast.error(error.userMessage || 'Failed to load users.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return users.filter((user) => {
      const role = user.roleName || user.role;
      const matchesRole = roleFilter === 'ALL' || role === roleFilter;
      const matchesQuery =
        !q ||
        [user.firstName, user.lastName, user.email, role]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(q));

      return matchesRole && matchesQuery;
    });
  }, [users, searchQuery, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedUsers = filteredUsers.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const openCreate = () => setModal({ type: 'create' });
  const openEdit = (user) => setModal({ type: 'edit', user });
  const openDetails = (user) => setModal({ type: 'details', user });
  const openDelete = (user) => setModal({ type: 'delete', user });
  const closeModal = () => setModal(null);

  const handleDelete = async (user) => {
    setDeleting(true);
    try {
      await userService.remove(getUserId(user));
      toast.success('User deleted.');
      closeModal();
      fetchUsers();
    } catch (error) {
      toast.error(error.userMessage || 'Failed to delete user.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="User Management" subtitle="Manage system users and roles.">
        <Button icon={UserPlus} onClick={openCreate}>
          Add User
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          className="w-full sm:w-96"
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            setPage(1);
          }}
          placeholder="Search by name, email or role..."
        />
        <select
          value={roleFilter}
          onChange={(event) => {
            setRoleFilter(event.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="ALL">All roles</option>
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <UsersTable
        users={pagedUsers}
        loading={loading}
        page={safePage}
        pageSize={PAGE_SIZE}
        total={filteredUsers.length}
        hasUsers={users.length > 0}
        onPageChange={setPage}
        onCreate={openCreate}
        onView={openDetails}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <UserFormModal
        open={modal?.type === 'create' || modal?.type === 'edit'}
        mode={modal?.type}
        user={modal?.user}
        onClose={closeModal}
        onSaved={fetchUsers}
      />

      <UserDetailsModal
        open={modal?.type === 'details'}
        user={modal?.user}
        onClose={closeModal}
      />

      <UserDeleteDialog
        open={modal?.type === 'delete'}
        user={modal?.user}
        loading={deleting}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UsersPage;
