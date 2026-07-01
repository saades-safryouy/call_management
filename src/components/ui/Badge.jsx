import React from 'react';

const COLORS = {
  gray: 'bg-gray-100 text-gray-800',
  red: 'bg-red-100 text-primary',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  amber: 'bg-amber-100 text-amber-800',
  purple: 'bg-purple-100 text-purple-800',
  teal: 'bg-teal-100 text-teal-800',
};

/**
 * Badge — small pill label. Props: color, children.
 */
const Badge = ({ color = 'gray', className = '', children }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${COLORS[color] || COLORS.gray} ${className}`}
  >
    {children}
  </span>
);

/** Map a backend role name to a badge color. */
export const roleColor = (role) =>
  ({ ADMIN: 'purple', MANAGER: 'blue', HR: 'teal', EVALUATOR: 'amber', CANDIDATE: 'gray' }[role] || 'gray');

/** Map a common status string to a badge color. */
export const statusColor = (status) => {
  const s = String(status || '').toUpperCase();
  if (['ACTIVE', 'OPEN', 'APPROVED', 'ACCEPTED', 'COMPLETED'].includes(s)) return 'green';
  if (['PENDING', 'UNDER_REVIEW', 'IN_REVIEW', 'SUBMITTED'].includes(s)) return 'amber';
  if (['CLOSED', 'REJECTED', 'DECLINED', 'EXPIRED'].includes(s)) return 'red';
  return 'gray';
};

export default Badge;
