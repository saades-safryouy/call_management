import ApplicationCard from './ApplicationCard';

const ApplicationsGrid = ({ applications, onView }) => {
  return (
    <div className="grid gap-6 mx-14 md:grid-cols-2 xl:grid-cols-3">
      {applications.map((application) => (
        <ApplicationCard
          key={application.applicationId}
          application={application}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default ApplicationsGrid;