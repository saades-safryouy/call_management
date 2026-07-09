import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';

const getFullName = (user) =>
  `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

const UserDeleteDialog = ({ open, user, loading = false, onClose, onConfirm }) => {
  const displayName = getFullName(user) || user?.email || 'this user';

  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onClose}
      title="Delete user"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" loading={loading} onClick={() => onConfirm?.(user)}>
            Delete
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Delete {displayName}?
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default UserDeleteDialog;
