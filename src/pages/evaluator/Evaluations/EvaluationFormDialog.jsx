import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import evaluationService from '../../../services/evaluationService';
import { COLORS } from '../../../utils/constants';

export default function EvaluationFormDialog({ open, onClose, application, user, onSuccess }) {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setScore(0);
      setComment('');
      setError('');
    }
  }, [open, application]);

  if (!application) return null;

  const handleSubmit = async () => {
    setError('');

    if (score < 0 || score > 100) {
      setError('Score must be between 0 and 100.');
      return;
    }

    try {
      setLoading(true);
      await evaluationService.create({
        score,
        comment,
        applicationId: application.applicationId,
        evaluatorId: user.userId,
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save the evaluation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>Evaluate Application</DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <div
            style={{
              border: '1px solid rgba(15, 23, 42, 0.08)',
              borderRadius: 12,
              padding: '12px 16px',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Candidate <strong style={{ color: '#0F172A' }}>{application.candidateEmail}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Call <strong style={{ color: '#0F172A' }}>{application.callTitle}</strong>
            </Typography>
          </div>

          <Box>
            <Typography gutterBottom>Score (0 - 100)</Typography>
            <TextField
              type="number"
              fullWidth
              value={score}
              inputProps={{ min: 0, max: 100 }}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </Box>

          <TextField
            label="Comments"
            multiline
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} disabled={loading} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            bgcolor: COLORS.primary,
            boxShadow: 'none',
            '&:hover': { bgcolor: COLORS.primaryHover, boxShadow: 'none' },
          }}
        >
          {loading ? 'Saving...' : 'Submit Evaluation'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}