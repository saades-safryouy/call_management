import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import documentService from '../../../services/documentService';
import { COLORS } from '../../../utils/constants';
import DocumentsTable from './DocumentsTable';
import DocumentDetailsModal from './DocumentDetailsModal';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [selected, setSelected] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const loadDocuments = async () => {
  try {
    setLoading(true);

    const data = type
      ? await documentService.getByType(type)
      : await documentService.getAll();

    setDocuments(data || []);
  } catch (error) {
    console.error(error);
    setDocuments([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadDocuments();
  }, [type]);

  const filtered = useMemo(() => {
    if (!search) return documents;

    return documents.filter((d) =>
      [d.fileName, d.fileType, d.filePath]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [documents, search]);

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: '18px',
          border: '1px solid',
          borderColor: 'rgba(15, 23, 42, 0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: '#0F172A', mb: 3 }}
          >
            Documents
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3}>
            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <TextField
              select
              sx={{ width: 220 }}
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="CV">CV</MenuItem>
              <MenuItem value="DIPLOMA">Diploma</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </TextField>
          </Stack>

          {loading ? (
            <Box textAlign="center" py={8}>
              <CircularProgress sx={{ color: COLORS.primary }} />
            </Box>
          ) : (
            <DocumentsTable
              rows={filtered}
              onView={(doc) => {
                setSelected(doc);
                setOpenDetails(true);
              }}
            />
          )}
        </CardContent>
      </Card>

      <DocumentDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        document={selected}
      />
    </Box>
  );
}