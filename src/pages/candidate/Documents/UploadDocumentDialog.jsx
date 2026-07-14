import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  LinearProgress,
  Alert,
  Stack,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import documentService from "../../../services/documentService";

const UploadDocumentDialog = ({
  open,
  applicationId,
  onClose,
  onSuccess,
}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a document.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      await documentService.upload(file, applicationId);

      setFile(null);

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (err) {
      console.error(err);
      setError("Unable to upload the document.");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (uploading) return;

    setFile(null);
    setError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Upload Document</DialogTitle>

      <DialogContent>

        <Stack spacing={2} sx={{ mt: 1 }}>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            fullWidth
          >
            Choose File

            <input
              hidden
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>

          {file && (
            <Typography variant="body2">
              Selected file:
              <br />
              <strong>{file.name}</strong>
            </Typography>
          )}

          {uploading && <LinearProgress />}

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleClose}
          disabled={uploading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          Upload
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default UploadDocumentDialog;