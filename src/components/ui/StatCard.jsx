import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ACCENTS = {
  primary: 'bg-primary-50 text-primary',
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  amber: 'bg-amber-50 text-amber-600',
  purple: 'bg-purple-50 text-purple-600',
  teal: 'bg-teal-50 text-teal-600',
};

/**
 * StatCard — reusable dashboard metric card.
 * Props: icon (lucide), label, value, accent, trend, trendType('increase'|'decrease').
 */
const StatCard = ({ icon: Icon, label, value, accent = 'primary', trend, trendType }) => (
  <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between">
      <div className={`rounded-lg p-3 ${ACCENTS[accent] || ACCENTS.primary}`}>
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      {trend && (
        <div
          className={`flex items-center rounded-full px-2 py-1 text-xs font-bold ${
            trendType === 'decrease' ? 'bg-red-50 text-primary' : 'bg-green-50 text-green-600'
          }`}
        >
          {trend}
          {trendType === 'decrease' ? (
            <ArrowDownRight className="ml-0.5 h-3 w-3" />
          ) : (
            <ArrowUpRight className="ml-0.5 h-3 w-3" />
          )}
        </div>
      )}
    </div>
    <div className="mt-4">
      <p className="text-sm font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  </div>
);

export default StatCard;
