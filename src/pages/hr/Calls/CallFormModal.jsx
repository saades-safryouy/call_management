import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';

import callService from '../../../services/callService';
import { COLORS } from '../../../utils/constants';

const statuses = ['OPEN', 'CLOSED', 'DRAFT'];

const initialForm = {
  title: '',
  description: '',
  openingDate: '',
  closingDate: '',
  status: 'DRAFT',
};

const CallFormModal = ({ open, onClose, call, refresh }) => {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (call) {
      setForm({
        title: call.title || '',
        description: call.description || '',
        openingDate: call.openingDate ? call.openingDate.substring(0, 16) : '',
        closingDate: call.closingDate ? call.closingDate.substring(0, 16) : '',
        status: call.status || 'DRAFT',
      });
    } else {
      setForm(initialForm);
    }
    setError('');
  }, [call, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError('');

    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!form.openingDate || !form.closingDate) {
      setError('Opening and Closing dates are required.');
      return;
    }

    try {
      setSaving(true);

      if (call) {
        await callService.update(call.callId, form);
      } else {
        await callService.create(form);
      }

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message ?? 'Unable to save call.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>
        {call ? 'Edit Call' : 'Create Call'}
      </DialogTitle>

      <DialogContent dividers>
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

        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Opening Date"
              type="datetime-local"
              name="openingDate"
              value={form.openingDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Closing Date"
              type="datetime-local"
              name="closingDate"
              value={form.closingDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} disabled={saving} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={saving}
          sx={{
            backgroundColor: COLORS.primary,
            boxShadow: 'none',
            '&:hover': { backgroundColor: COLORS.primaryHover, boxShadow: 'none' },
          }}
        >
          {saving ? 'Saving...' : call ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CallFormModal;