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
  CircularProgress,
} from '@mui/material';
import applicationService from '../../../services/applicationService';
import userService from '../../../services/userService';
import { COLORS } from '../../../utils/constants';

const AssignEvaluatorModal = ({ open, onClose, application, refresh }) => {
  const [evaluators, setEvaluators] = useState([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      loadEvaluators();
      setError('');
    }
  }, [open]);

  useEffect(() => {
    if (application) {
      setSelectedEvaluator(application.evaluatorId || '');
    }
  }, [application]);

  const loadEvaluators = async () => {
    try {
      setLoading(true);
      const data = await userService.getByRole('EVALUATOR');
      setEvaluators(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      console.error(err);
      setError('Could not load evaluators.');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    setError('');

    if (!selectedEvaluator) {
      setError('Please select an evaluator.');
      return;
    }

    try {
      setSaving(true);
      await applicationService.assignEvaluator(application.applicationId, selectedEvaluator);
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Unable to assign evaluator.');
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
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>Assign Evaluator</DialogTitle>

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

        {loading ? (
          <div className="flex justify-center py-6">
            <CircularProgress size={28} sx={{ color: COLORS.primary }} />
          </div>
        ) : (
          <FormControl fullWidth>
            <InputLabel>Evaluator</InputLabel>
            <Select
              label="Evaluator"
              value={selectedEvaluator}
              onChange={(e) => setSelectedEvaluator(e.target.value)}
            >
              {evaluators.map((user) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.firstName} {user.lastName} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} disabled={saving} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAssign}
          disabled={saving || loading}
          sx={{
            backgroundColor: COLORS.primary,
            boxShadow: 'none',
            '&:hover': { backgroundColor: COLORS.primaryHover, boxShadow: 'none' },
          }}
        >
          {saving ? 'Assigning...' : 'Assign'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignEvaluatorModal;