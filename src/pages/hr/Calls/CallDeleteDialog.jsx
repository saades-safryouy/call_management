import React, { useState } from 'react';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import callService from '../../../services/callService';

const CallDeleteDialog = ({ open, onClose, call, refresh }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!call) return;

    try {
      setLoading(true);
      setError('');
      await callService.remove(call.callId);
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to delete the call.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmDialog
      open={open}
      loading={loading}
      error={error}
      title="Delete Call"
      message={
        call
          ? `Are you sure you want to delete "${call.title}"? This action cannot be undone.`
          : 'Are you sure you want to delete this call?'
      }
      confirmText="Delete"
      cancelText="Cancel"
      confirmColor="error"
      onConfirm={handleDelete}
      onCancel={onClose}
    />
  );
};

export default CallDeleteDialog;