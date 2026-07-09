import { IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import { DataGrid } from '@mui/x-data-grid';
import { COLORS } from '../../../utils/constants';

export default function DocumentsTable({ rows, onView }) {
  const columns = [
    { field: 'documentId', headerName: 'ID', width: 80 },
    {
      field: 'fileName',
      headerName: 'File Name',
      flex: 1,
      renderCell: (params) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DescriptionIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          {params.value || '—'}
        </span>
      ),
    },
    { field: 'fileType', headerName: 'Type', width: 130 },
    { field: 'applicationId', headerName: 'Application', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="View">
          <IconButton
            size="small"
            onClick={() => onView(params.row)}
            sx={{ color: 'text.secondary', '&:hover': { color: COLORS.info } }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

console.log(rows);
  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      getRowId={(row) => row.documentId}
      pageSizeOptions={[5, 10, 20]}
      disableRowSelectionOnClick
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      sx={{
        border: '1px solid rgba(15, 23, 42, 0.08)',
        borderRadius: '16px',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#F9FAFB',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 700,
          fontSize: '0.78rem',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          color: 'text.secondary',
        },
        '& .MuiDataGrid-cell': {
          borderColor: 'rgba(15, 23, 42, 0.06)',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: alpha(COLORS.primary, 0.04),
        },
      }}
    />
  );
}