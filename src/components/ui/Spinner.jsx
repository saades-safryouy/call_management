import React from 'react';

const SIZES = {
  xs: 'h-4 w-4 border-2',
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
};

/**
 * Spinner — brand-colored loading indicator.
 * Props: size ('xs'|'sm'|'md'|'lg'), className, label (for centered full-block use)
 */
const Spinner = ({ size = 'md', className = '' }) => (
  <div
    role="status"
    aria-label="Loading"
    className={`inline-block animate-spin rounded-full border-primary border-t-transparent ${SIZES[size] || SIZES.md} ${className}`}
  />
);

/**
 * Centered spinner filling its container — for page/section loading states.
 */
export const PageSpinner = ({ label = 'Loading…', size = 'lg' }) => (
  <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-4 text-gray-500">
    <Spinner size={size} />
    {label && <p className="text-sm font-medium">{label}</p>}
  </div>
);

export default Spinner;
