import React from 'react';
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Calendar,
  ArrowRight
} from 'lucide-react';

const EvaluatorDashboard = () => {
  const stats = [
    { name: 'Pending Evaluations', value: '5', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Completed Today', value: '3', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Total Assigned', value: '28', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Average Score Given', value: '78/100', icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluator Dashboard</h1>
          <p className="text-sm text-gray-500">Review and evaluate candidate applications efficiently.</p>
        </div>
        <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-red-700 transition-all active:scale-95">
          <span>Start Evaluating</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center space-x-4">
              <div className={`rounded-xl ${stat.bg} p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.name}</p>
                <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Tasks */}
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Pending Evaluations</h3>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-600 uppercase">Priority</span>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold">
                      {i}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">Candidate Application #{4500 + i}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                        <span className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          Software Engineer
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due: June 25, 2026
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="text-xs font-bold text-red-600 hover:underline">Review Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-100">
            <button className="text-sm font-bold text-gray-600 hover:text-red-600 transition-colors">View all tasks</button>
          </div>
        </div>

        {/* Evaluation Guidelines/Tips */}
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-900">Evaluation Guidelines</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 rounded-full bg-blue-100 p-1 text-blue-600">
                <AlertCircle className="h-4 w-4" />
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">Objectivity:</span> Always maintain a neutral perspective based on the criteria provided for each call.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 rounded-full bg-green-100 p-1 text-green-600">
                <AlertCircle className="h-4 w-4" />
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">Consistency:</span> Use the same logic across all candidates within the same call category.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 rounded-full bg-red-100 p-1 text-red-600">
                <AlertCircle className="h-4 w-4" />
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">Deadlines:</span> Complete evaluations within 48 hours of assignment to maintain system efficiency.
              </p>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-red-600 text-white shadow-lg">
              <p className="text-sm font-bold">Need assistance?</p>
              <p className="text-xs mt-1 opacity-90">Contact the Manager or system administrator for any clarification on evaluation criteria.</p>
              <button className="mt-3 text-xs font-extrabold bg-white text-red-600 px-3 py-1.5 rounded-lg">Get Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorDashboard;
