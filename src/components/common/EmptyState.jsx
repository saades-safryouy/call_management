import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({
  title = 'No data found',
  description = 'There is nothing to display at the moment.',
  icon: Icon = Inbox,
  action = null,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
      <div className="mb-5 rounded-full bg-red-50 p-5">
        <Icon className="h-10 w-10 text-red-300" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;