import React from 'react';
import { 
  Users, 
  PhoneCall, 
  ClipboardList, 
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: Users, change: '+12%', changeType: 'increase' },
    { name: 'Active Calls', value: '45', icon: PhoneCall, change: '+5%', changeType: 'increase' },
    { name: 'Applications', value: '890', icon: ClipboardList, change: '-2%', changeType: 'decrease' },
    { name: 'Evaluations', value: '12', icon: CheckCircle, change: '+18%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-3 ${
                stat.name === 'Total Users' ? 'bg-blue-100 text-blue-600' :
                stat.name === 'Active Calls' ? 'bg-orange-100 text-orange-600' :
                stat.name === 'Applications' ? 'bg-purple-100 text-purple-600' :
                'bg-green-100 text-green-600'
              }`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center text-xs font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="ml-1 h-3 w-3" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Charts/Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-80 rounded-xl border border-dashed border-gray-300 bg-white flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-gray-500">Activity Analytics (Coming Soon)</p>
          </div>
        </div>
        <div className="h-80 rounded-xl border border-dashed border-gray-300 bg-white flex items-center justify-center">
          <div className="text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-gray-500">Recent Applications (Coming Soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
