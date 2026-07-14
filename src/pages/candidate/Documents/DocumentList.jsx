import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
  Tooltip,
  Divider,
  Button,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import RefreshIcon from "@mui/icons-material/Refresh";

import documentService from "../../../services/documentService";

const DocumentList = ({
  applicationId,
  canDelete = false,
}) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDocuments = async () => {
    try {
      setLoading(true);

      const data = await documentService.getByApplication(applicationId);

      setDocuments(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId) {
      loadDocuments();
    }
  }, [applicationId]);

  const handleDownload = async (document) => {
    try {
      await documentService.download(document.fileName);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      await documentService.remove(documentId);

      loadDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <Stack alignItems="center" py={3}>
        <CircularProgress />
      </Stack>
    );

  if (error)
    return <Alert severity="error">{error}</Alert>;

  if (!documents.length)
    return (
      <Alert severity="info">
        No documents uploaded yet.
      </Alert>
    );

  return (
    <Stack spacing={2}>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">
          Documents
        </Typography>

        <Tooltip title="Refresh">
          <IconButton onClick={loadDocuments}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {documents.map((document) => (
        <Card
          key={document.id}
          variant="outlined"
          sx={{
            borderRadius: 2,
          }}
        >
          <CardContent>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <DescriptionIcon color="primary" />

                <div>
                  <Typography fontWeight={600}>
                    {document.fileName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {document.fileType}
                  </Typography>
                </div>
              </Stack>

              <Stack direction="row">

                <Tooltip title="Download">
                  <IconButton
                    onClick={() =>
                      handleDownload(document)
                    }
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>

                {canDelete && (
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(document.documentId)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}

              </Stack>

            </Stack>

          </CardContent>
        </Card>
      ))}

    </Stack>
  );
};

export default DocumentList;