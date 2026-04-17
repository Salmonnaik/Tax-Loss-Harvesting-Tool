import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="flex space-x-2">
        <div className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent animate-spin hover-scale`}>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
        <div className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent animate-spin hover-scale`} style={{ animationDelay: '0.2s' }}>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent animate-spin hover-scale`} style={{ animationDelay: '0.4s' }}>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <div className="relative w-48 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div className="absolute inset-0 bg-blue-600 rounded-full animate-shimmer"></div>
      </div>
      
      <p className="text-gray-600 text-sm font-medium animate-pulse">{message}</p>
      
      <div className="flex space-x-2 mt-4">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  );
};

export default Loader;
