import React from 'react';
import Badge, { statusColor } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';

const emptyValue = '—';

const getCallId = (call) => call?.callId ?? call?.id;

const formatDate = (value) => {
  if (!value) return emptyValue;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const Row = ({ label, children }) => (
  <div className="flex justify-between gap-4 border-b border-gray-100 py-3 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-right text-sm font-semibold text-gray-900">{children}</span>
  </div>
);

const CallDetailsModal = ({ open, call, onClose }) => {
  if (!call) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Call details"
      size="lg"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-gray-900">{call.title || emptyValue}</h3>
            <Badge color={statusColor(call.status)}>{call.status || emptyValue}</Badge>
          </div>
          <p className="mt-2 whitespace-pre-line text-sm text-gray-600">
            {call.description || emptyValue}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 px-4">
          <Row label="Call ID">{getCallId(call) || emptyValue}</Row>
          <Row label="Opening date">{formatDate(call.openingDate)}</Row>
          <Row label="Closing date">{formatDate(call.closingDate)}</Row>
          <Row label="Created by">{call.createdByEmail || call.createdById || emptyValue}</Row>
          <Row label="Created">{formatDate(call.createdAt)}</Row>
          <Row label="Last updated">{formatDate(call.updatedAt)}</Row>
        </div>
      </div>
    </Modal>
  );
};

export default CallDetailsModal;