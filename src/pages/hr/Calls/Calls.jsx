import React, { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@mui/material';
import callService from '../../../services/callService';
import PageHeader from '../../../components/common/PageHeader';
import SearchBar from '../../../components/common/SearchBar';
import Loading from '../../../components/common/Loading';
import CallsTable from './CallsTable';
import CallFormModal from './CallFormModal';
import CallDetailsModal from './CallDetailsModal';
import CallDeleteDialog from './CallDeleteDialog';

const Calls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCall, setSelectedCall] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const loadCalls = async () => {
    try {
      setLoading(true);
      const data = await callService.getAll();
      setCalls(Array.isArray(data) ? data : data.content || []);
    } catch (error) {
      console.error(error);
      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalls();
  }, []);

  const filteredCalls = useMemo(() => {
    const keyword = search.toLowerCase();
    return calls.filter(
      (call) =>
        call.title?.toLowerCase().includes(keyword) ||
        call.description?.toLowerCase().includes(keyword) ||
        call.status?.toLowerCase().includes(keyword)
    );
  }, [calls, search]);

  const handleCreate = () => {
    setSelectedCall(null);
    setFormOpen(true);
  };

  const handleEdit = (call) => {
    setSelectedCall(call);
    setFormOpen(true);
  };

  const handleView = (call) => {
    setSelectedCall(call);
    setDetailsOpen(true);
  };

  const handleDelete = (call) => {
    setSelectedCall(call);
    setDeleteOpen(true);
  };

  if (loading) {
    return <Loading text="Loading calls..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Calls Management" subtitle="Create, update and manage recruitment calls.">
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={handleCreate}
          sx={{
            backgroundColor: '#E30613',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#C40511', boxShadow: 'none' },
          }}
        >
          New Call
        </Button>
      </PageHeader>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by title, description or status..."
      />

      <CallsTable
        rows={filteredCalls}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CallFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        call={selectedCall}
        refresh={loadCalls}
      />

      <CallDetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} call={selectedCall} />

      <CallDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        call={selectedCall}
        refresh={loadCalls}
      />
    </div>
  );
};

export default Calls;