import { Chip, IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
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
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default function AssignedApplicationsTable({ rows, onView }) {
  const columns = [
    { field: 'applicationId', headerName: 'ID', width: 80 },
    { field: 'candidateEmail', headerName: 'Candidate', flex: 1, minWidth: 220 },
    { field: 'callTitle', headerName: 'Call', flex: 1, minWidth: 220 },
    {
      field: 'submissionDate',
      headerName: 'Submitted',
      width: 150,
      valueFormatter: (value) => formatDate(value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 170,
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={value ? value.replace('_', ' ') : '—'}
          sx={{
            bgcolor: alpha(getStatusColor(value), 0.15),
            color: getStatusColor(value),
            fontWeight: 700,
          }}
        />
      ),
    },
     {
      field: 'finalScore',
      headerName: 'Score',
      width: 100,
      valueFormatter: (value) =>
        value == null ? '—' : Number(value).toFixed(2),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Tooltip title="View Details">
          <IconButton
            size="small"
            onClick={() => onView(row)}
            sx={{ color: 'text.secondary', '&:hover': { color: COLORS.primary } }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      getRowId={(row) => row.applicationId}
      disableRowSelectionOnClick
      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      sx={{
        borderRadius: 3,
        border: '1px solid rgba(15,23,42,.08)',
        '& .MuiDataGrid-columnHeaders': {
          background: '#F9FAFB',
          borderBottom: '1px solid rgba(15,23,42,.08)',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '.8rem',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: alpha(COLORS.primary, 0.04),
        },
      }}
    />
  );
}