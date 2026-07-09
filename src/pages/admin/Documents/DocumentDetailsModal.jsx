import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { COLORS } from '../../../utils/constants';

const emptyValue = '—';

const Row = ({ label, children }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      padding: '12px 0',
      borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
    }}
  >
    <span style={{ fontSize: 14, color: '#6B7280' }}>{label}</span>
    <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', textAlign: 'right' }}>
      {children}
    </span>
  </div>
);

export default function DocumentDetailsModal({ open, onClose, document }) {
  if (!document) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>
        Document Details
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <div
          style={{
            border: '1px solid rgba(15, 23, 42, 0.08)',
            borderRadius: 12,
            padding: '0 16px',
          }}
        >
          <Row label="ID">{document.documentId ?? emptyValue}</Row>
          <Row label="File Name">{document.fileName || emptyValue}</Row>
          <Row label="Type">{document.fileType || emptyValue}</Row>
          <Row label="Application">{document.applicationId ?? emptyValue}</Row>
          <Row label="Path">{document.filePath || emptyValue}</Row>
        </div>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: COLORS.primary,
            '&:hover': { backgroundColor: COLORS.primaryHover },
            boxShadow: 'none',
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}