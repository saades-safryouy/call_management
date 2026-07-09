import React from 'react';
import { Chip, IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Eye, UserCheck, FileText, RefreshCw } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import { COLORS } from '../../../utils/constants';

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'SUBMITTED':
      return COLORS.info;
    case 'UNDER_REVIEW':
      return COLORS.warning;
    case 'SHORTLISTED':
      return COLORS.secondary;
    case 'ACCEPTED':
      return COLORS.success;
    case 'REJECTED':
      return COLORS.error;
    default:
      return COLORS.secondary;
  }
};

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : '—');

const ApplicationsTable = ({ rows, onView, onAssign, onStatus, onDocuments }) => {
  const columns = [
    { field: 'applicationId', headerName: 'ID', width: 80 },
    { field: 'candidateEmail', headerName: 'Candidate', flex: 2, minWidth: 220 },
    { field: 'callTitle', headerName: 'Call', flex: 2, minWidth: 220 },
    {
      field: 'submissionDate',
      headerName: 'Submitted',
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const color = getStatusColor(params.value);
        return (
          <Chip
            label={params.value || '—'}
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
      field: 'finalScore',
      headerName: 'Score',
      width: 100,
      renderCell: (params) =>
        params.value !== null && params.value !== undefined
          ? Number(params.value).toFixed(2)
          : '—',
    },
    {
      field: 'evaluatorEmail',
      headerName: 'Evaluator',
      flex: 1.8,
      minWidth: 200,
      renderCell: (params) => params.value || 'Not Assigned',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 190,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => onView(row)}
              sx={{ color: 'text.secondary', '&:hover': { color: COLORS.info } }}
            >
              <Eye size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Assign Evaluator">
            <IconButton
              size="small"
              onClick={() => onAssign(row)}
              sx={{ color: 'text.secondary', '&:hover': { color: COLORS.warning } }}
            >
              <UserCheck size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change Status">
            <IconButton
              size="small"
              onClick={() => onStatus(row)}
              sx={{ color: 'text.secondary', '&:hover': { color: COLORS.success } }}
            >
              <RefreshCw size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Candidate Documents">
            <IconButton
              size="small"
              onClick={() => onDocuments(row)}
              sx={{ color: 'text.secondary', '&:hover': { color: COLORS.primary } }}
            >
              <FileText size={16} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return <DataTable rows={rows} columns={columns} getRowId={(row) => row.applicationId} />;
};

export default ApplicationsTable;