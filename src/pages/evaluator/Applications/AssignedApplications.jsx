import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import applicationService from '../../../services/applicationService';
import AssignedApplicationsTable from './AssignedApplicationsTable';
import ApplicationDetailsDialog from './ApplicationDetailsDialog';
import EvaluationFormDialog from '../evaluations/EvaluationFormDialog';
import { COLORS } from '../../../utils/constants';
import { useAuth } from '../../../context/AuthContext';

export default function AssignedApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEvaluation, setOpenEvaluation] = useState(false);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await applicationService.getByEvaluator(user.userId);
      setApplications(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      console.error(err);
      setError('Could not load your assigned applications.');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      loadApplications();
    }
  }, [user]);

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid #E5E7EB',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 700, color: '#0F172A' }}
          >
            Assigned Applications
          </Typography>

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
            <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress sx={{ color: COLORS.primary }} />
            </Box>
          ) : (
            <AssignedApplicationsTable
              rows={applications}
              onView={(application) => {
                setSelected(application);
                setOpenDetails(true);
              }}
            />
          )}
        </CardContent>
      </Card>

      <ApplicationDetailsDialog
        open={openDetails}
        application={selected}
        onClose={() => setOpenDetails(false)}
        onEvaluate={(application) => {
          setSelected(application);
          setOpenDetails(false);
          setOpenEvaluation(true);
        }}
      />

      <EvaluationFormDialog
        open={openEvaluation}
        application={selected}
        user={user}
        onClose={() => setOpenEvaluation(false)}
        onSuccess={() => {
          setOpenEvaluation(false);
          loadApplications();
        }}
      />
    </Box>
  );
}