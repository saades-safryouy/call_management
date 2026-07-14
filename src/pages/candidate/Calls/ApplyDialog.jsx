import { Send } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';

const ApplyDialog = ({ open, onClose, onApply, loading }) => {
  return (
    <Modal open={open} onClose={onClose} title="Apply for this position">
      <div className="space-y-6">
        <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <Send size={16} />
          </div>
          <p className="text-sm text-gray-600">
            Are you sure you want to submit your application for this opportunity? You won't be
            able to edit it after submitting.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button loading={loading} onClick={onApply}>
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplyDialog;