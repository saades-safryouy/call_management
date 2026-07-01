import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Build a compact page window like: 1 … 4 5 [6] 7 8 … 20
 */
const buildPages = (page, totalPages) => {
  const pages = [];
  const push = (p) => pages.push(p);
  const window = 1;
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || (p >= page - window && p <= page + window)) {
      push(p);
    } else if (pages[pages.length - 1] !== '…') {
      push('…');
    }
  }
  return pages;
};

/**
 * Pagination — reusable page controls with a range summary.
 * Props: page, pageSize, total, onPageChange
 */
const Pagination = ({ page, pageSize, total, onPageChange }) => {
  if (!total) return null;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-6 py-3 sm:flex-row">
      <p className="text-xs text-gray-500">
        Showing <span className="font-semibold text-gray-700">{start}</span>–
        <span className="font-semibold text-gray-700">{end}</span> of{' '}
        <span className="font-semibold text-gray-700">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {buildPages(page, totalPages).map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`} className="px-2 text-sm text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`h-8 min-w-8 rounded-lg px-2 text-sm font-semibold transition-colors ${
                p === page
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
