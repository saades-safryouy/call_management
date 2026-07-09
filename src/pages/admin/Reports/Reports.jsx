import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';

import StatisticsCards from './StatisticsCards';
import ApplicationsChart from './ApplicationsChart';
import CallsChart from './CallsChart';
import RecentApplicationsTable from './RecentApplicationsTable';

import userService from '../../../services/userService';
import callService from '../../../services/callService';
import applicationService from '../../../services/applicationService';

export default function Reports() {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [calls, setCalls] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [usersData, callsData, applicationsData] = await Promise.all([
        userService.getAll(),
        callService.getAll(),
        applicationService.getAll(),
      ]);

      setUsers(Array.isArray(usersData) ? usersData : usersData.content || []);
      setCalls(Array.isArray(callsData) ? callsData : callsData.content || []);
      setApplications(
        Array.isArray(applicationsData) ? applicationsData : applicationsData.content || []
      );
    } catch (error) {
      console.error('Failed to load reports.', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress sx={{ color: '#E30613' }} />
      </Box>
    );
  }

  const accepted = applications.filter((a) => a.status === 'ACCEPTED').length;
  const rejected = applications.filter((a) => a.status === 'REJECTED').length;
  const underReview = applications.filter((a) => a.status === 'UNDER_REVIEW').length;

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: '#0F172A', mb: 3 }}
      >
        Reports & Statistics
      </Typography>

      <StatisticsCards
        users={users.length}
        calls={calls.length}
        applications={applications.length}
        accepted={accepted}
        rejected={rejected}
        underReview={underReview}
      />

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={6}>
          <ApplicationsChart applications={applications} />
        </Grid>

        <Grid item xs={12} md={6}>
          <CallsChart calls={calls} />
        </Grid>

        <Grid item xs={12}>
          <RecentApplicationsTable applications={applications} />
        </Grid>
      </Grid>
    </Box>
  );
}