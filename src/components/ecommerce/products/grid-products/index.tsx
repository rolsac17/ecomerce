import React, { FC } from 'react';

export const GridProducts: FC = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
      {children}
    </div>
  );
};
