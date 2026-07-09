import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Loading from './Loading';
import EmptyState from './EmptyState';

const BRAND = '#E30613';

const DataTable = ({
  rows = [],
  columns = [],
  loading = false,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  autoHeight = true,
  getRowId,
  onRowClick,
}) => {
  if (loading) {
    return <Loading text="Loading data..." />;
  }

  if (!loading && rows.length === 0) {
    return (
      <EmptyState title="No Data Found" description="There are no records available." />
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        bgcolor: '#fff',
        borderRadius: '16px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        autoHeight={autoHeight}
        pageSizeOptions={pageSizeOptions}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize } },
        }}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        loading={loading}
        onRowClick={onRowClick}
        sx={{
          border: 0,
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
          '& .MuiDataGrid-row:hover': {
            backgroundColor: alpha(BRAND, 0.04),
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#fff',
            borderTop: '1px solid rgba(15, 23, 42, 0.08)',
          },
        }}
      />
    </Box>
  );
};

export default DataTable;