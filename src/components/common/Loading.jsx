import React from 'react';

const Loading = ({ text = 'Loading...', fullScreen = false, size = 'md' }) => {
  const spinnerSize = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-[3px]',
    lg: 'h-14 w-14 border-4',
  };

  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm'
    : 'flex w-full items-center justify-center py-12';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <div
          className={`${spinnerSize[size]} animate-spin rounded-full border-[#E30613] border-t-transparent`}
        />
        <p className="text-sm font-medium text-gray-500">{text}</p>
      </div>
    </div>
  );
};

export default Loading;