import React from 'react';
import { IconButton, Chip, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import { COLORS } from '../../../utils/constants';

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'OPEN':
      return COLORS.success;
    case 'CLOSED':
      return COLORS.error;
    case 'DRAFT':
      return COLORS.warning;
    default:
      return COLORS.secondary;
  }
};

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '—');

const CallsTable = ({ rows, onView, onEdit, onDelete }) => {
  const columns = [
    { field: 'callId', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', flex: 2, minWidth: 220 },
    {
     field: 'openingDate',
     headerName: 'Opening Date',
     flex: 1.2,
     minWidth: 170,
     valueFormatter: (value) =>
     value ? new Date(value).toLocaleDateString() : '-',
    },
    {
     field: 'closingDate',
     headerName: 'Closing Date',
     flex: 1.2,
     minWidth: 170,
     valueFormatter: (value) =>
     value ? new Date(value).toLocaleDateString() : '-',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      renderCell: ({ value }) => {
        const color = getStatusColor(value);
        return (
          <Chip
            label={value || '—'}
            size="small"
            sx={{
              backgroundColor: alpha(color, 0.12),
              color,
              fontWeight: 600,
              border: '1px solid',
              borderColor: alpha(color, 0.24),
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Tooltip title="View">
            <IconButton
              size="small"
              onClick={() => onView(row)}
              sx={{ color: 'text.secondary', '&:hover': { color: COLORS.info } }}
            >
              <Eye size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => onEdit(row)}
              sx={{ color: 'text.secondary', '&:hover': { color: COLORS.warning } }}
            >
              <Pencil size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => onDelete(row)}
              sx={{ color: 'text.secondary', '&:hover': { color: COLORS.error } }}
            >
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return <DataTable rows={rows} columns={columns} getRowId={(row) => row.callId} />;
};

export default CallsTable;