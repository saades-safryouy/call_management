import React from 'react';
import { 
  Users, 
  PhoneCall, 
  ClipboardList, 
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Activity,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: Users, change: '+12%', changeType: 'increase' },
    { name: 'Active Calls', value: '45', icon: PhoneCall, change: '+5%', changeType: 'increase' },
    { name: 'Applications', value: '890', icon: ClipboardList, change: '-2%', changeType: 'decrease' },
    { name: 'Evaluations', value: '12', icon: CheckCircle, change: '+18%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-sm text-gray-500">System-wide statistics and management control panel.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
          <Activity className="h-4 w-4 text-red-600" />
          <span>System Status: <span className="text-green-600 font-bold">Optimal</span></span>
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
              <div className={`flex items-center text-xs font-bold ${
                stat.changeType === 'increase' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
              } px-2 py-1 rounded-full`}>
                {stat.change}
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="ml-0.5 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="ml-0.5 h-3 w-3" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.name}</p>
              <p className="mt-1 text-3xl font-extrabold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">System Activity Analytics</h3>
            <TrendingUp className="h-5 w-5 text-red-600" />
          </div>
          <div className="h-64 flex flex-col items-center justify-center p-6">
            <div className="w-full h-full bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Activity className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-2 text-sm font-medium text-gray-400">Activity Chart Placeholder</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Security & Logs</h3>
            <Shield className="h-5 w-5 text-red-600" />
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="mt-1 h-8 w-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 truncate">Successful Admin Login</p>
                    <p className="text-xs text-gray-500 flex items-center mt-0.5">
                      <Clock className="h-3 w-3 mr-1" />
                      {i * 15} minutes ago • IP: 192.168.1.{10 + i}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

