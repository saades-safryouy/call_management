import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import applicationService from '../../../services/applicationService';
import { COLORS } from '../../../utils/constants';

const statuses = ['SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'];

const ChangeStatusModal = ({ open, onClose, application, refresh }) => {
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (application) {
      setStatus(application.status || 'SUBMITTED');
    }
    setError('');
  }, [application, open]);

  const handleSave = async () => {
    setError('');

    if (!status) {
      setError('Please select a status.');
      return;
    }

    try {
      setSaving(true);
      await applicationService.changeStatus(application.applicationId, status);
      await refresh();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Unable to update application status.');
    } finally {
      setSaving(false);
    }
  };

  if (!application) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>
        Change Application Status
      </DialogTitle>

      <DialogContent dividers>
        <div
          style={{
            border: '1px solid rgba(15, 23, 42, 0.08)',
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 20,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Application <strong style={{ color: '#0F172A' }}>#{application.applicationId}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Candidate <strong style={{ color: '#0F172A' }}>{application.candidateEmail}</strong>
          </Typography>
        </div>

        {error && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              px: 2,
              py: 1,
              borderRadius: '10px',
              backgroundColor: `${COLORS.error}14`,
              color: COLORS.error,
            }}
          >
            {error}
          </Typography>
        )}

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((item) => (
              <MenuItem key={item} value={item}>
                {item.replaceAll('_', ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} disabled={saving} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{
            backgroundColor: COLORS.primary,
            boxShadow: 'none',
            '&:hover': { backgroundColor: COLORS.primaryHover, boxShadow: 'none' },
          }}
        >
          {saving ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeStatusModal;