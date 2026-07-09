import React from 'react';
import Badge, { roleColor, statusColor } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';

const emptyValue = '-';

const getUserId = (user) => user?.userId ?? user?.id;

const getFullName = (user) =>
  `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || emptyValue;

const formatDate = (value) => {
  if (!value) return emptyValue;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const Row = ({ label, children }) => (
  <div className="flex justify-between gap-4 border-b border-gray-50 py-2.5 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-right text-sm font-semibold text-gray-900">{children}</span>
  </div>
);

const UserDetailsModal = ({ open, user, onClose }) => {
  if (!user) return null;

  const fullName = getFullName(user);
  const role = user.roleName || user.role || emptyValue;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="User details"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary">
          {(fullName !== emptyValue ? fullName : user.email || 'U').substring(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-gray-900">{fullName}</p>
          <p className="truncate text-sm text-gray-500">{user.email || emptyValue}</p>
        </div>
      </div>

      <div>
        <Row label="User ID">{getUserId(user) || emptyValue}</Row>
        <Row label="First name">{user.firstName || emptyValue}</Row>
        <Row label="Last name">{user.lastName || emptyValue}</Row>
        <Row label="Email">{user.email || emptyValue}</Row>
        <Row label="Role">
          <Badge color={roleColor(role)}>{role}</Badge>
        </Row>
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
