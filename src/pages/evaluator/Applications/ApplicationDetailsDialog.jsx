import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { COLORS } from '../../../utils/constants';

const getStatusColor = (status) => {
  switch (status) {
    case 'UNDER_REVIEW':
      return COLORS.warning;
    case 'ACCEPTED':
      return COLORS.success;
    case 'REJECTED':
      return COLORS.error;
    case 'SUBMITTED':
      return COLORS.info;
    default:
      return COLORS.secondary;
  }
};

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function ApplicationDetailsDialog({ open, onClose, application, onEvaluate }) {
  if (!application) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>Application Details</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Application ID
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>#{application.applicationId}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={application.status || '—'}
              sx={{
                mt: 1,
                bgcolor: alpha(getStatusColor(application.status), 0.15),
                color: getStatusColor(application.status),
                fontWeight: 700,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Candidate
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>{application.candidateEmail || '—'}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Call
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>{application.callTitle || '—'}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Submission Date
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {formatDate(application.submissionDate)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Final Score
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>{application.finalScore ?? '—'}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: COLORS.primary,
                  boxShadow: 'none',
                  '&:hover': { bgcolor: COLORS.primaryHover, boxShadow: 'none' },
                }}
                onClick={() => onEvaluate?.(application)}
              >
                Evaluate Application
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}