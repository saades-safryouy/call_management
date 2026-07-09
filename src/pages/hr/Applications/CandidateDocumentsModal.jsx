import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Download } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import documentService from '../../../services/documentService';
import { COLORS } from '../../../utils/constants';

const CandidateDocumentsModal = ({ open, onClose, application }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open && application) {
      loadDocuments();
    }
  }, [open, application]);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await documentService.getByApplication(application.applicationId);
      setDocuments(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load documents.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc) => {
    setError('');

    try {
      const blob = await documentService.download(doc.filePath);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Unable to download document.');
    }
  };

  const columns = [
    { field: 'documentId', headerName: 'ID', width: 80 },
    { field: 'fileName', headerName: 'File Name', flex: 2, minWidth: 220 },
    {
      field: 'fileType',
      headerName: 'Type',
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value || 'Unknown'}
          size="small"
          sx={{
            backgroundColor: `${COLORS.secondary}1F`,
            color: COLORS.secondary,
            fontWeight: 600,
          }}
        />
      ),
    },
    { field: 'filePath', headerName: 'Storage Path', flex: 2, minWidth: 260 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Tooltip title="Download">
          <IconButton
            size="small"
            onClick={() => handleDownload(row)}
            sx={{ color: 'text.secondary', '&:hover': { color: COLORS.primary } }}
          >
            <Download size={16} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>Candidate Documents</DialogTitle>

      <DialogContent dividers>
        {error && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              px: 2,
              py: 1,
              borderRadius: '10px',
              backgroundColor: `${COLORS.error}14`,
              color: COLORS.error,
            }}
          >
            {error}
          </Typography>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <CircularProgress size={28} sx={{ color: COLORS.primary }} />
          </div>
        ) : documents.length === 0 ? (
          <Typography align="center" color="text.secondary" py={4}>
            No documents found for this application.
          </Typography>
        ) : (
          <DataTable rows={documents} columns={columns} getRowId={(row) => row.documentId} />
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: COLORS.primary,
            boxShadow: 'none',
            '&:hover': { backgroundColor: COLORS.primaryHover, boxShadow: 'none' },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CandidateDocumentsModal;