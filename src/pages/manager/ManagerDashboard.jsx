import React from 'react';
import { 
  PhoneCall, 
  Users, 
  ClipboardList, 
  TrendingUp,
  Clock,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';

const ManagerDashboard = () => {
  const stats = [
    { name: 'Active Calls', value: '12', icon: PhoneCall, change: '+2', changeType: 'increase' },
    { name: 'Team Members', value: '8', icon: Users, change: '0', changeType: 'neutral' },
    { name: 'Pending Evaluations', value: '24', icon: ClipboardList, change: '+5', changeType: 'increase' },
    { name: 'Completion Rate', value: '85%', icon: TrendingUp, change: '+3%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's what's happening with your calls today.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
          <Clock className="h-4 w-4 text-red-600" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md border border-gray-100">
            <div className="absolute top-0 left-0 h-1 w-full bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-red-50 p-3 text-red-600 ring-1 ring-red-600/10">
                <stat.icon className="h-6 w-6" />
              </div>
              {stat.change !== '0' && (
                <div className={`flex items-center text-xs font-bold ${
                  stat.changeType === 'increase' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                } px-2 py-1 rounded-full`}>
                  {stat.change}
                  <ArrowUpRight className="ml-0.5 h-3 w-3" />
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.name}</p>
              <p className="mt-1 text-3xl font-extrabold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Call Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-50 hover:border-red-100 hover:bg-red-50/30 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <PhoneCall className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Call for Software Engineer #{1000 + i}</p>
                      <p className="text-xs text-gray-500">Updated 2 hours ago by Admin</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Required */}
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-red-50/50 px-6 py-4">
            <h3 className="text-lg font-bold text-red-600 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Action Required
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-100">
                <p className="text-sm font-bold text-orange-800">Assign Evaluators</p>
                <p className="text-xs text-orange-700 mt-1">3 new calls need evaluators assigned before the deadline.</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <p className="text-sm font-bold text-blue-800">Review Evaluations</p>
                <p className="text-xs text-blue-700 mt-1">12 evaluations are ready for final review and approval.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
