import React from 'react';
import { Inbox } from 'lucide-react';

/**
 * EmptyState — consistent "nothing here" / "no results" block.
 * Props:
 *  - icon: lucide icon component (defaults to Inbox)
 *  - title, description
 *  - action: optional ReactNode (e.g. a button)
 *  - className
 */
const EmptyState = ({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description,
  action,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center px-6 py-16 text-center ${className}`}>
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
      <Icon className="h-7 w-7" />
    </div>
    <h3 className="mt-4 text-base font-semibold text-gray-900">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
