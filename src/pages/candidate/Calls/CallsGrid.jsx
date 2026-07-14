import CallCard from './CallCard';

const CallsGrid = ({ calls }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {calls.map((call) => (
        <CallCard
          key={call.callId}
          call={call}
        />
      ))}
    </div>
  );
};

export default CallsGrid;