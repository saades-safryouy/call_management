import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Upload } from 'lucide-react';

import applicationService from '../../../services/applicationService';
import ApplicationTimeline from '../Applications/ApplicationTimeline';
import Loading from '../../../components/common/Loading';
import EmptyState from '../../../components/ui/EmptyState';

import DocumentList from '../Documents/DocumentList';
import UploadDocumentDialog from '../Documents/UploadDocumentDialog';

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-GB') : '—';

const STATUS_STYLES = {
  SUBMITTED: 'bg-blue-100 text-blue-700',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [refreshDocuments, setRefreshDocuments] = useState(0);

  const refreshDocumentList = () => {
    setRefreshDocuments((prev) => prev + 1);
  };

  useEffect(() => {
    const loadApplication = async () => {
      try {
        setLoading(true);

        const data = await applicationService.getById(applicationId);

        setApplication(data);
      } catch (err) {
        console.error(err);
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      loadApplication();
    }
  }, [applicationId]);

  if (loading) {
    return <Loading />;
  }

  if (!application) {
    return (
      <EmptyState
        title="Application not found"
        description="The requested application could not be found."
      />
    );
  }

  const statusStyle =
    STATUS_STYLES[application.status] ||
    'bg-gray-100 text-gray-700';

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-6">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer mb-6 flex items-center gap-2 text-gray-600 transition hover:text-primary"
          >
            <ArrowLeft size={18} />
            Back to Applications
          </button>

          <div className="grid gap-8 lg:grid-cols-3">

            {/* ================= LEFT ================= */}

            <div className="space-y-8 lg:col-span-2">

              {/* Header */}

              <div className="rounded-2xl border border-gray-200 bg-white p-8">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
                >
                  {application.status}
                </span>

                <div className="mt-5 flex items-center gap-4">

                  <ClipboardList
                    size={34}
                    className="text-primary"
                  />

                  <div>

                    <h1 className="text-4xl font-bold text-gray-900">
                      {application.callTitle}
                    </h1>

                    <p className="mt-2 text-gray-500">
                      Submitted on {formatDate(application.submissionDate)}
                    </p>

                  </div>

                </div>

              </div>

              {/* Position */}

              <div className="rounded-2xl border border-gray-200 bg-white p-8">

                <h2 className="mb-6 text-2xl font-bold">
                  Position Information
                </h2>

                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <p className="text-sm text-gray-500">
                      Job Title
                    </p>

                    <p className="mt-1 font-semibold">
                      {application.callTitle}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Submission Date
                    </p>

                    <p className="mt-1 font-semibold">
                      {formatDate(application.submissionDate)}
                    </p>
                  </div>

                </div>

              </div>

           
              {/* Documents */}

              <div className="rounded-2xl border border-gray-200 bg-white p-8">

                <div className="mb-6 flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-900">
                      Documents
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Upload and manage all documents related to this application.
                    </p>

                  </div>

                  <button
                    onClick={() => setOpenUploadDialog(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    <Upload size={18} />
                    Upload
                  </button>

                </div>

                <DocumentList
                  applicationId={application.applicationId}
                  refreshTrigger={refreshDocuments}
                  canDelete={true}
                />

              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div>

              <div className=" top-24 rounded-2xl border border-gray-200 bg-white p-6">

                <h2 className="text-xl font-bold">
                  Application Summary
                </h2>

                <div className="mt-6 space-y-5">

                  <div>
                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <p
                      className={`mt-1 inline-block rounded-full px-2 py-1 text-sm font-semibold ${statusStyle}`}
                    >
                      {application.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Submission Date
                    </p>

                    <p className="font-medium">
                      {formatDate(application.submissionDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Final Score
                    </p>

                    <p className="font-medium">
                      {application.finalScore ?? 'Pending'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Evaluator
                    </p>

                    <p className="font-medium">
                      {application.evaluatorFirstName + ' ' + application.evaluatorLastName || 'Not Assigned'}
                    </p>
                  </div>

                </div>

              </div>
            {/* Application Timeline */}
              <div className=" mt-8 rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold">
                    Application Timeline
                </h2>
                <ApplicationTimeline status={application.status} />
              </div>
            </div>

          </div>

        </div>
      </div>

      <UploadDocumentDialog
        open={openUploadDialog}
        applicationId={application.applicationId}
        onClose={() => setOpenUploadDialog(false)}
        onSuccess={refreshDocumentList}
      />
    </>
  );
};

export default ApplicationDetails;