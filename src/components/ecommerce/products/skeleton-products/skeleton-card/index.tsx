import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="border border-gray-200 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col space-y-4 justify-center align-center">
        <div className="rounded-full bg-gray-200 h-20 w-20 mx-auto"/>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-200 rounded col-span-2"></div>
              <div className="h-2 bg-gray-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
