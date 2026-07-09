import React from 'react';

const PageHeader = ({ title, subtitle, children, className = '' }) => {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 md:flex-row md:items-center md:justify-between ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#E30613]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      {children && (
        <div className="flex flex-wrap items-center gap-3">{children}</div>
      )}
    </div>
  );
};

export default PageHeader;