import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { COLORS } from '../../../utils/constants';

const STATUS_META = [
  { id: 0, status: 'OPEN', label: 'Open', color: COLORS.success },
  { id: 1, status: 'CLOSED', label: 'Closed', color: COLORS.error },
  { id: 2, status: 'DRAFT', label: 'Draft', color: COLORS.warning },
];

export default function CallsChart({ calls = [] }) {
  const counts = STATUS_META.map((meta) => ({
    ...meta,
    value: calls.filter((call) => call.status === meta.status).length,
  }));

  const total = calls.length;
  const hasData = total > 0;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        width: '120%',
        borderRadius: '18px',
        border: '1px solid',
        borderColor: 'rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardContent  sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: '#0F172A', mb: 2 }}
        >
          Calls by Status
        </Typography>

        {hasData ? (
          <Box sx={{ position: 'relative' }}>
            <PieChart
              height={300}
              series={[
                {
                  innerRadius: 65,
                  outerRadius: 120,
                  paddingAngle: 3,
                  cornerRadius: 5,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 65, additionalRadius: -8, color: 'gray' },
                  valueFormatter: (item) => {
                    const pct = total ? Math.round((item.value / total) * 100) : 0;
                    return `${item.value} (${pct}%)`;
                  },
                  data: counts.map(({ id, value, label, color }) => ({
                    id,
                    value,
                    label,
                    color,
                  })),
                },
              ]}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'center' },
                  padding: 0,
                  itemMarkWidth: 10,
                  itemMarkHeight: 10,
                  markGap: 6,
                  itemGap: 14,
                  labelStyle: { fontSize: 12, fill: '#475569' },
                },
              }}
              margin={{ top: 10, bottom: 60, left: 10, right: 10 }}
            />

            {/* Center readout inside the donut hole */}
            <Box
              sx={{
                position: 'absolute',
                top: 'calc(50% - 30px)',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1 }}
              >
                {total.toLocaleString()}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontSize: '0.68rem',
                }}
              >
                Total
              </Typography>
            </Box>
          </Box>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={0.5}
            sx={{ height: 300, color: 'text.secondary' }}
          >
            <Typography variant="body2" fontWeight={600}>
              No calls yet
            </Typography>
            <Typography variant="caption">
              Calls for applications will appear here by status.
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}