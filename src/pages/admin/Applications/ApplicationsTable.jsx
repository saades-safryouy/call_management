import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { COLORS } from "../../../utils/constants";

const getStatusColor = (status) => {
  switch (status) {
    case "ACCEPTED":
      return COLORS.success;
    case "REJECTED":
      return COLORS.error;
    case "UNDER_REVIEW":
      return COLORS.warning;
    case "PENDING":
      return COLORS.info;
    default:
      return COLORS.secondary;
  }
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

export default function ApplicationsTable({ rows, onView, onEdit, onDelete }) {
  const columns = [
    { field: "applicationId", headerName: "ID", width: 80 },
    { field: "candidateEmail", headerName: "Email", flex: 1.5 },
    { field: "callTitle", headerName: "Call", flex: 1.5 },
    {
      field: "submissionDate",
      headerName: "Submitted",
      flex: 1,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const color = getStatusColor(params.value);
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: alpha(color, 0.12),
              color,
              fontWeight: 600,
              border: "1px solid",
              borderColor: alpha(color, 0.24),
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View">
            <IconButton
              size="small"
              onClick={() => onView(params.row)}
              sx={{ color: "text.secondary", "&:hover": { color: COLORS.info } }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => onEdit(params.row)}
              sx={{ color: "text.secondary", "&:hover": { color: COLORS.warning } }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => onDelete(params.row)}
              sx={{ color: "text.secondary", "&:hover": { color: COLORS.error } }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.applicationId}
      autoHeight
      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: { paginationModel: { page: 0, pageSize: 10 } },
      }}
      disableRowSelectionOnClick
      sx={{
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: "16px",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#F9FAFB",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 700,
          fontSize: "0.78rem",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          color: "text.secondary",
        },
        "& .MuiDataGrid-cell": {
          borderColor: "rgba(15, 23, 42, 0.06)",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: alpha(COLORS.primary, 0.04),
        },
      }}
    />
  );
}