import React from 'react'
import { SkeletonCard } from '../skeleton-card';

export const SkeletonGrid: React.FC = () => {
  const numberItems = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ];
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-8'>
      {
        numberItems.map(number =>(
          <SkeletonCard key={number} />
        ))
      }
    </div>
  )
}
