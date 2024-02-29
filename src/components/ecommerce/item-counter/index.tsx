import React, { FC } from 'react'
import { PlusSmIcon as PlusSmIconSolid, MinusSmIcon as MinusSmIconSolid } from '@heroicons/react/solid'

interface Props {
  currentValue: number;
  maxValue: number;
  // Methods
  updatedQuantity: (newValue: number) => void;
}
export const ItemCounter:FC<Props> = ({currentValue, updatedQuantity, maxValue}) => {
  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;
      return updatedQuantity( currentValue - 1);
    }

    if (currentValue >= maxValue) return;

    updatedQuantity(currentValue + 1)
  }
  return (
    <div className='flex space-x-4 items-center'>
      <button
        onClick={() => addOrRemove(-1)}
        type="button"
        className="inline-flex items-center p-1 border border-gray-600 rounded-full shadow-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <MinusSmIconSolid className="h-5 w-5" aria-hidden="true" />
      </button>
      <p className='text-gray-600'>{currentValue}</p>
      <button
        onClick={() => addOrRemove(+1)}
        type="button"
        className="inline-flex items-center p-1 border border-gray-600 rounded-full shadow-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
