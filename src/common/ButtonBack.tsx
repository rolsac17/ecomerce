import React from 'react';
interface Props {
  [x: string]: any;
}
export const ButtonBack = ({ ...props }) => {
  return (
    <button
      {...props}
      className='mt-6 bg-transparent text-gray-400 hover:text-gray-500 font-bold py-1  inline-flex items-center border-b-2 border-gray-400 hover:border-gray-500'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M11 17l-5-5m0 0l5-5m-5 5h12'
        />
      </svg>
      <span>Anterior</span>
    </button>
  );
};
