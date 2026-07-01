import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

const prettify = (segment) =>
  segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/**
 * Breadcrumbs derived from the URL path.
 * e.g. /admin/assign-evaluators -> [home] › Assign Evaluators
 */
const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean); // [role, section, ...]
  const role = parts[0];
  const sections = parts.slice(1);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link to={`/${role}/dashboard`} className="text-gray-400 transition-colors hover:text-primary">
        <Home className="h-4 w-4" />
      </Link>
      {sections.map((seg, i) => {
        const to = `/${[role, ...sections.slice(0, i + 1)].join('/')}`;
        const isLast = i === sections.length - 1;
        return (
          <React.Fragment key={to}>
            <ChevronRight className="h-4 w-4 text-gray-300" />
            {isLast ? (
              <span className="font-semibold text-gray-800">{prettify(seg)}</span>
            ) : (
              <Link to={to} className="text-gray-500 transition-colors hover:text-primary">
                {prettify(seg)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
