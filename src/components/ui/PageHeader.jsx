import React from 'react';

/**
 * PageHeader — consistent title/subtitle + optional actions row.
 * Props: title, subtitle, children (action buttons rendered on the right).
 */
const PageHeader = ({ title, subtitle, children }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
    </div>
    {children && <div className="flex items-center gap-2">{children}</div>}
  </div>
);

export default PageHeader;
