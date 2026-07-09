import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { AlertTriangle } from 'lucide-react';

const ICON_STYLES = {
  error: { bg: 'bg-red-100', text: 'text-red-600' },
  warning: { bg: 'bg-amber-100', text: 'text-amber-600' },
  primary: { bg: 'bg-red-100', text: 'text-red-600' },
};

const ConfirmDialog = ({
  open,
  title = 'Confirm Action',
  message = 'Are you sure you want to continue?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'error',
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const icon = ICON_STYLES[confirmColor] || ICON_STYLES.error;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle>
        <div className="flex items-center gap-3">
          <div className={`rounded-full ${icon.bg} p-2`}>
            <AlertTriangle className={`h-6 w-6 ${icon.text}`} />
          </div>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <Typography color="text.secondary">{message}</Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onCancel} disabled={loading} sx={{ boxShadow: 'none' }}>
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color={confirmColor}
          onClick={onConfirm}
          disabled={loading}
          sx={{ boxShadow: 'none' }}
        >
          {loading ? 'Please wait...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;