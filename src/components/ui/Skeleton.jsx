import React from 'react';

/**
 * Skeleton — generic shimmer placeholder.
 * Compose with tailwind sizing: <Skeleton className="h-4 w-32" />
 */
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

/**
 * A few text lines of decreasing width.
 */
export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
    ))}
  </div>
);

/**
 * Reusable skeleton rows for tables.
 * Props: rows, cols
 */
export const SkeletonTableRows = ({ rows = 5, cols = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, r) => (
      <tr key={r}>
        {Array.from({ length: cols }).map((_, c) => (
          <td key={c} className="px-6 py-4">
            <Skeleton className={`h-4 ${c === 0 ? 'w-40' : 'w-24'}`} />
          </td>
        ))}
      </tr>
    ))}
  </>
);

/**
 * Reusable skeleton grid of cards.
 */
export const SkeletonCards = ({ count = 4, className = '' }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`rounded-xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}>
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="mt-4 h-3 w-24" />
        <Skeleton className="mt-2 h-6 w-16" />
      </div>
    ))}
  </>
);

export default Skeleton;
