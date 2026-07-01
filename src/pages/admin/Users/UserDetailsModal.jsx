import React from 'react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Badge, { statusColor } from '../../../components/ui/Badge';

const formatDate = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString();
};

const Row = ({ label, children }) => (
  <div className="flex justify-between gap-4 border-b border-gray-50 py-2.5 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-right text-sm font-semibold text-gray-900">{children}</span>
  </div>
);

/**
 * Read-only view of a user's full UserDTO.
 */
const UserDetailsModal = ({ open, user, onClose }) => {
  if (!user) return null;
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || '—';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="User details"
      footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary">
          {(fullName !== '—' ? fullName : user.email || 'U').substring(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{fullName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <div>
        <Row label="User ID">{user.userId}</Row>
        <Row label="Role">{user.roleName || '—'}</Row>
        <Row label="Status">
          <Badge color={user.enabled ? statusColor('ACTIVE') : 'gray'}>
            {user.enabled ? 'Active' : 'Disabled'}
          </Badge>
        </Row>
        <Row label="Created">{formatDate(user.createdAt)}</Row>
        <Row label="Last updated">{formatDate(user.updatedAt)}</Row>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
