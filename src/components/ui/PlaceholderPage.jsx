import React from 'react';
import { Wrench } from 'lucide-react';
import PageHeader from './PageHeader';
import EmptyState from './EmptyState';

/**
 * PlaceholderPage — honest scaffold for a navigation target whose business
 * module has not been implemented yet. Contains NO mock data; it simply states
 * the module is coming. Real pages replace this as each module is built.
 */
const PlaceholderPage = ({ title, subtitle, description, contained = false }) => {
  const body = (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <EmptyState
          icon={Wrench}
          title="Module coming soon"
          description={description || `The ${title} module has not been implemented yet.`}
        />
      </div>
    </div>
  );

  // Candidate area has a full-bleed layout, so it needs its own container.
  return contained ? (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{body}</div>
  ) : (
    body
  );
};

export default PlaceholderPage;
