import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import {
  People,
  Campaign,
  Description,
  CheckCircle,
  Cancel,
  HourglassEmpty,
} from '@mui/icons-material';

import { COLORS } from '../../../utils/constants';

// Each card maps to one token from the app's color system, so the dashboard
// reads at a glance without needing to read the numbers first:
// brand red for the headline metric, secondary/info for neutral volume
// metrics, and success/error/warning for the three application outcomes.
const cards = [
  {
    key: 'users',
    title: 'Total Users',
    icon: People,
    accent: COLORS.primary,
    accentSoft: COLORS.primaryLight,
  },
  {
    key: 'calls',
    title: 'Total Calls',
    icon: Campaign,
    accent: COLORS.secondary,
    accentSoft: COLORS.secondaryLight,
  },
  {
    key: 'applications',
    title: 'Applications',
    icon: Description,
    accent: COLORS.info,
    accentSoft: alpha(COLORS.info, 0.12),
  },
  {
    key: 'accepted',
    title: 'Accepted',
    icon: CheckCircle,
    accent: COLORS.success,
    accentSoft: alpha(COLORS.success, 0.12),
  },
  {
    key: 'rejected',
    title: 'Rejected',
    icon: Cancel,
    accent: COLORS.error,
    accentSoft: alpha(COLORS.error, 0.1),
  },
  {
    key: 'underReview',
    title: 'Under Review',
    icon: HourglassEmpty,
    accent: COLORS.warning,
    accentSoft: alpha(COLORS.warning, 0.12),
  },
];

export default function StatisticsCards({
  users = 0,
  calls = 0,
  applications = 0,
  accepted = 0,
  rejected = 0,
  underReview = 0,
}) {
  const values = {
    users,
    calls,
    applications,
    accepted,
    rejected,
    underReview,
  };

  return (
    <Grid container spacing={3}>
      {cards.map(({ key, title, icon: Icon, accent, accentSoft }) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
          <Card
            elevation={0}
            sx={{
              position: 'relative',
              height: '100%',
              borderRadius: '18px',
              border: '1px solid',
              borderColor: 'rgba(15, 23, 42, 0.08)',
              overflow: 'hidden',
              transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                borderColor: 'rgba(15, 23, 42, 0.14)',
                boxShadow: `0 12px 24px -12px ${accent}55`,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: accent,
              },
            }}
          >
            <CardContent sx={{ pt: 3, pb: '20px !important', px: 2.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                      display: 'block',
                    }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mt: 0.75,
                      color: '#0F172A',
                      lineHeight: 1.1,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {values[key].toLocaleString()}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flexShrink: 0,
                    width: 46,
                    height: 46,
                    borderRadius: '12px',
                    backgroundColor: accentSoft,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon sx={{ color: accent, fontSize: 24 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}