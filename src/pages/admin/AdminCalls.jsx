import React from 'react';
import { PhoneCall, Plus, Search } from 'lucide-react';

const AdminCalls = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Call Management</h1>
          <p className="text-sm text-gray-500">Monitor and manage all calls for applications</p>
        </div>
        <button className="flex items-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-700 transition-all active:scale-[0.98]">
          <Plus className="h-4 w-4" />
          <span>New Call</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            placeholder="Search calls by title, reference..."
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <PhoneCall className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p>No calls found. Click "New Call" to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminCalls;
