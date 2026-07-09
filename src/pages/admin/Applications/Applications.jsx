import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import applicationService from '../../../services/applicationService';
import { COLORS } from '../../../utils/constants';

import ApplicationsTable from './ApplicationsTable';
import ApplicationDetailsModal from './ApplicationDetailsModal';

const STATUS_OPTIONS = ['', 'PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'];

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const [selected, setSelected] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const loadApplications = async () => {
    try {
      setLoading(true);

      let data;

      if (status) {
        data = await applicationService.getByStatus(status);
      } else {
        data = await applicationService.getAll();
      }

      setApplications(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      console.error(err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [status]);

  const filteredApplications = useMemo(() => {
    if (!search) return applications;

    return applications.filter((app) => {
      const text = [app.candidateEmail, app.callTitle, app.status]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [applications, search]);

  const handleDetails = (row) => {
    setSelected(row);
    setOpenDetails(true);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: '18px',
          border: '1px solid',
          borderColor: 'rgba(15, 23, 42, 0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: '#0F172A', mb: 3 }}
          >
            Applications
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3}>
            <TextField
              label="Search"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <TextField
              select
              label="Status"
              value={status}
              sx={{ width: 220 }}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>

              {STATUS_OPTIONS.filter(Boolean).map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {loading ? (
            <Box textAlign="center" py={8}>
              <CircularProgress sx={{ color: COLORS.primary }} />
            </Box>
          ) : (
            <ApplicationsTable rows={filteredApplications} onView={handleDetails} />
          )}
        </CardContent>
      </Card>

      <ApplicationDetailsModal
        open={openDetails}
        application={selected}
        onClose={() => setOpenDetails(false)}
      />
    </Box>
  );
}