import React from 'react';

export const LoadingOrder = () => {
  return (
    <div className="flex flex-col space-y-4 border border-slate-300 shadow rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-lg bg-slate-400 h-32 w-32" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2" />
              <div className="h-2 bg-slate-400 rounded col-span-1" />
            </div>
            <div className="h-2 bg-slate-400 rounded" />
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-lg bg-slate-400 h-32 w-32" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2" />
              <div className="h-2 bg-slate-400 rounded col-span-1" />
            </div>
            <div className="h-2 bg-slate-400 rounded" />
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-lg bg-slate-400 h-32 w-32" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2" />
              <div className="h-2 bg-slate-400 rounded col-span-1" />
            </div>
            <div className="h-2 bg-slate-400 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
