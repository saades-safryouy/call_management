import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import ApplicationStatusBadge from './ApplicationStatusBadge';
import ApplicationTimeline from './ApplicationTimeline';
import UploadDocumentDialog from '../Documents/UploadDocumentDialog';
import DocumentList from '../Documents/DocumentList';

const formatDate = (date) => (date ? new Date(date).toLocaleString() : '—');

const ApplicationDetailsDialog = ({ open, application, onClose }) => {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [refreshDocuments, setRefreshDocuments] = useState(0);

  if (!application) return null;

  const refreshDocumentList = () => {
    setRefreshDocuments((prev) => prev + 1);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ color: '#0F172A', fontWeight: 'bold' }}>
          Application Details
        </DialogTitle>

        <DialogContent dividers>
          <div className="space-y-6">
            {/* Position */}
            <section>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Position
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-semibold">{application.callTitle}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <ApplicationStatusBadge status={application.status} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p>{formatDate(application.submissionDate)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Final Score</p>
                  <p className="font-semibold text-primary">
                    {application.finalScore ?? 'Pending'}
                  </p>
                </div>
              </div>
            </section>

            <Divider />

            {/* Documents */}
            <section>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight="bold">
                  Documents
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<UploadFileIcon />}
                  onClick={() => setOpenUploadDialog(true)}
                >
                  Upload Document
                </Button>
              </Stack>

              <DocumentList
                key={refreshDocuments}
                applicationId={
                  application.applicationId ?? application.id
                }
                canDelete={false}
              />
            </section>

            <Divider />

            {/* Candidate */}
            <section>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Candidate
              </h3>
              <p>{application.candidateEmail}</p>
            </section>

            <Divider />

            {/* Evaluator */}
            <section>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Evaluator
              </h3>
              <p>{application.evaluatorEmail ?? 'Not assigned'}</p>
            </section>

            <Divider />

            {/* History */}
            <section>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                History
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium">
                    {formatDate(application.createdAt)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="font-medium">
                    {formatDate(application.updatedAt)}
                  </span>
                </div>
              </div>
            </section>

            <Divider />

            {/* Timeline */}
            <section>
              <ApplicationTimeline status={application.status} />
            </section>
          </div>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: '#E30613',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#C40511',
                boxShadow: 'none',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <UploadDocumentDialog
        open={openUploadDialog}
        applicationId={application.applicationId ?? application.id}
        onClose={() => setOpenUploadDialog(false)}
        onSuccess={refreshDocumentList}
      />
    </>
  );
};

export default ApplicationDetailsDialog;