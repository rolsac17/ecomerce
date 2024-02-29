import React from 'react';

export const ShipmentsContainer: React.FC = ({ children }) => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
        <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
          {children}
        </div>
      </div>
    </div>
  );
};
