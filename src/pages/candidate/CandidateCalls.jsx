import React from 'react';
import { Search, Briefcase } from 'lucide-react';

const CandidateCalls = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Available Calls</h1>
          <p className="text-sm text-gray-500">Find and apply to open positions at Attijariwafa Bank</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            placeholder="Search by keyword, department..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-red-600">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <Briefcase className="h-6 w-6" />
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">ACTIVE</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Position Title #{i}</h3>
            <p className="text-xs text-gray-500 mb-4">Ref: AW-2026-00{i}</p>
            <p className="text-sm text-gray-600 mb-6 line-clamp-2">
              Join our dynamic team at Attijariwafa Bank. We are looking for talented individuals to contribute to our digital transformation journey.
            </p>
            <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateCalls;
