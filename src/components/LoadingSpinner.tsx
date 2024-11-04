import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 animate-spin"></div>
        {/* Inner ring */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-4 border-indigo-600 animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 