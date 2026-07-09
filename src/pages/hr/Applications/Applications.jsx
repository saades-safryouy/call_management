import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { RefreshCw } from 'lucide-react';
import applicationService from '../../../services/applicationService';
import PageHeader from '../../../components/common/PageHeader';
import SearchBar from '../../../components/common/SearchBar';
import Loading from '../../../components/common/Loading';
import ApplicationsTable from './ApplicationsTable';
import ApplicationDetailsModal from './ApplicationDetailsModal';
import AssignEvaluatorModal from './AssignEvaluatorModal';
import ChangeStatusModal from './ChangeStatusModal';
import CandidateDocumentsModal from './CandidateDocumentsModal';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [documentsOpen, setDocumentsOpen] = useState(false);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAll();
      setApplications(Array.isArray(data) ? data : data.content || []);
    } catch (error) {
      console.error(error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const keyword = search.toLowerCase();
    return applications.filter(
      (application) =>
        application.candidateEmail?.toLowerCase().includes(keyword) ||
        application.callTitle?.toLowerCase().includes(keyword) ||
        application.status?.toLowerCase().includes(keyword)
    );
  }, [applications, search]);

  if (loading) {
    return <Loading text="Loading applications..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Applications" subtitle="Review and manage candidate applications.">
        <Button
          variant="outlined"
          startIcon={<RefreshCw size={18} />}
          onClick={loadApplications}
          sx={{
            borderColor: '#E30613',
            color: '#E30613',
            '&:hover': { borderColor: '#C40511', backgroundColor: 'rgba(227,6,19,0.04)' },
          }}
        >
          Refresh
        </Button>
      </PageHeader>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by candidate, call or status..."
      />

      <ApplicationsTable
        rows={filteredApplications}
        onView={(application) => {
          setSelectedApplication(application);
          setDetailsOpen(true);
        }}
        onAssign={(application) => {
          setSelectedApplication(application);
          setAssignOpen(true);
        }}
        onStatus={(application) => {
          setSelectedApplication(application);
          setStatusOpen(true);
        }}
        onDocuments={(application) => {
          setSelectedApplication(application);
          setDocumentsOpen(true);
        }}
      />

      <ApplicationDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        application={selectedApplication}
      />

      <AssignEvaluatorModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        application={selectedApplication}
        refresh={loadApplications}
      />

      <ChangeStatusModal
        open={statusOpen}
        onClose={() => setStatusOpen(false)}
        application={selectedApplication}
        refresh={loadApplications}
      />

      <CandidateDocumentsModal
        open={documentsOpen}
        onClose={() => setDocumentsOpen(false)}
        application={selectedApplication}
      />
    </div>
  );
};

export default Applications;