import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { COLORS } from '../../../utils/constants';

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'OPEN':
      return COLORS.success;
    case 'CLOSED':
      return COLORS.error;
    case 'DRAFT':
      return COLORS.warning;
    default:
      return COLORS.secondary;
  }
};

const formatDate = (date) => (date ? new Date(date).toLocaleString() : '—');

const DetailItem = ({ label, value }) => (
  <div className="mb-4">
    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 500, color: '#0F172A' }}>
      {value || '—'}
    </Typography>
  </div>
);

const CallDetailsModal = ({ open, onClose, call }) => {
  if (!call) return null;

  const statusColor = getStatusColor(call.status);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>Call Details</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DetailItem label="Call ID" value={call.callId} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Status
            </Typography>
            <Chip
              label={call.status || '—'}
              sx={{
                backgroundColor: alpha(statusColor, 0.12),
                color: statusColor,
                fontWeight: 600,
                border: '1px solid',
                borderColor: alpha(statusColor, 0.24),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <DetailItem label="Title" value={call.title} />
          </Grid>

          <Grid item xs={12}>
            <DetailItem label="Description" value={call.description} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Opening Date" value={formatDate(call.openingDate)} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Closing Date" value={formatDate(call.closingDate)} />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Created By" value={call.createdByEmail} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Creator ID" value={call.createdById} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Created At" value={formatDate(call.createdAt)} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Last Updated" value={formatDate(call.updatedAt)} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: COLORS.primary,
            boxShadow: 'none',
            '&:hover': { backgroundColor: COLORS.primaryHover, boxShadow: 'none' },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CallDetailsModal;