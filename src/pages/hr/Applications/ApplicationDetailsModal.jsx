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
    case 'SUBMITTED':
      return COLORS.info;
    case 'UNDER_REVIEW':
      return COLORS.warning;
    case 'SHORTLISTED':
      return COLORS.secondary;
    case 'ACCEPTED':
      return COLORS.success;
    case 'REJECTED':
      return COLORS.error;
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

const ApplicationDetailsModal = ({ open, onClose, application }) => {
  if (!application) return null;

  const statusColor = getStatusColor(application.status);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>
        Application Details
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DetailItem label="Application ID" value={application.applicationId} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Status
            </Typography>
            <Chip
              label={application.status || '—'}
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

          <Grid item xs={12} md={6}>
            <DetailItem label="Candidate" value={application.candidateEmail} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Candidate ID" value={application.candidateId} />
          </Grid>

          <Grid item xs={12}>
            <DetailItem label="Call" value={application.callTitle} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Call ID" value={application.callId} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Submission Date" value={formatDate(application.submissionDate)} />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem
              label="Assigned Evaluator"
              value={application.evaluatorEmail || 'Not Assigned'}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Evaluator ID" value={application.evaluatorId} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem
              label="Final Score"
              value={
                application.finalScore !== null && application.finalScore !== undefined
                  ? Number(application.finalScore).toFixed(2)
                  : null
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Created At" value={formatDate(application.createdAt)} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem label="Updated At" value={formatDate(application.updatedAt)} />
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

export default ApplicationDetailsModal;