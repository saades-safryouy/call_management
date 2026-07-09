import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import { COLORS } from '../../../utils/constants';

// Same semantic tokens used across the dashboard's cards and charts.
const getStatusColor = (status) => {
  switch (status) {
    case 'ACCEPTED':
      return COLORS.success;
    case 'REJECTED':
      return COLORS.error;
    case 'UNDER_REVIEW':
      return COLORS.warning;
    case 'SHORTLISTED':
      return COLORS.secondary;
    default:
      return COLORS.info;
  }
};

const formatStatusLabel = (status = '') =>
  status
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const headerCellSx = {
  fontWeight: 700,
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: 'text.secondary',
  borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
};

export default function RecentApplicationsTable({ applications = [] }) {
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate))
    .slice(0, 10);

  const hasData = recentApplications.length > 0;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: '18px',
        border: '1px solid',
        borderColor: 'rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: '#0F172A', mb: 2 }}
        >
          Recent Applications
        </Typography>

        {hasData ? (
          <TableContainer
            sx={{
              border: '1px solid',
              borderColor: 'rgba(15, 23, 42, 0.06)',
              borderRadius: '12px',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                  <TableCell sx={headerCellSx}>Candidate</TableCell>
                  <TableCell sx={headerCellSx}>Call</TableCell>
                  <TableCell align="center" sx={headerCellSx}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={headerCellSx}>
                    Score
                  </TableCell>
                  <TableCell sx={headerCellSx}>Submitted</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recentApplications.map((application) => {
                  const statusColor = getStatusColor(application.status);

                  return (
                    <TableRow
                      key={application.applicationId}
                      hover
                      sx={{ '&:last-child td': { borderBottom: 0 } }}
                    >
                      <TableCell sx={{ color: '#0F172A', fontWeight: 500 }}>
                        {application.candidateEmail}
                      </TableCell>

                      <TableCell sx={{ color: 'text.secondary' }}>
                        {application.callTitle}
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={formatStatusLabel(application.status)}
                          sx={{
                            backgroundColor: alpha(statusColor, 0.12),
                            color: statusColor,
                            fontWeight: 600,
                            fontSize: '0.72rem',
                            border: '1px solid',
                            borderColor: alpha(statusColor, 0.24),
                          }}
                        />
                      </TableCell>

                      <TableCell align="center" sx={{ fontWeight: 600, color: '#0F172A' }}>
                        {application.finalScore ?? '—'}
                      </TableCell>

                      <TableCell sx={{ color: 'text.secondary' }}>
                        {application.submissionDate
                          ? new Date(application.submissionDate).toLocaleDateString()
                          : '—'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={0.5}
            sx={{ height: 200, color: 'text.secondary' }}
          >
            <Typography variant="body2" fontWeight={600}>
              No applications yet
            </Typography>
            <Typography variant="caption">
              Recent submissions will appear here as they come in.
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}