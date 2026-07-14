import { CheckCircle2, Circle, XCircle } from 'lucide-react';

const STEPS = [
  { key: 'SUBMITTED', label: 'Application Submitted' },
  { key: 'UNDER_REVIEW', label: 'Under Review' },
  { key: 'SHORTLISTED', label: 'Shortlisted' },
  { key: 'ACCEPTED', label: 'Accepted' },
];

const getCurrentStep = (status) => {
  switch (status) {
    case 'SUBMITTED':
      return 0;
    case 'UNDER_REVIEW':
      return 1;
    case 'SHORTLISTED':
      return 2;
    case 'ACCEPTED':
      return 3;
    case 'REJECTED':
      return 1; // rejected after review
    default:
      return 0;
  }
};

const ApplicationTimeline = ({ status }) => {
  const currentStep = getCurrentStep(status);
  const isRejected = status === 'REJECTED';

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-900">Recruitment Progress</h3>

      <div className="space-y-0">
        {STEPS.map((step, index) => {
          const rejectedHere = isRejected && index === currentStep;
          const completed = !rejectedHere && index <= currentStep;
          const lineCompleted = index < currentStep && !(isRejected && index === currentStep - 0);

          return (
            <div key={step.key} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                {rejectedHere ? (
                  <XCircle className="h-7 w-7 text-red-500" />
                ) : completed ? (
                  <CheckCircle2 className="h-7 w-7 text-green-500" />
                ) : (
                  <Circle className="h-7 w-7 text-gray-300" />
                )}

                {index !== STEPS.length - 1 && (
                  <div
                    className={`mt-1 h-10 w-0.5 ${
                      index < currentStep ? 'bg-green-400' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>

              <div className="pb-5">
                <p
                  className={`font-medium ${
                    rejectedHere
                      ? 'text-red-600'
                      : completed
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>

                {rejectedHere && (
                  <p className="mt-1 text-sm text-red-500">Application rejected at this stage.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationTimeline;