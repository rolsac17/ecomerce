import React from 'react';

interface Props {
  onClick: () => void;
  variations: variationButton;
  right?: boolean;
}

export type variationButton = 'large' | 'round';

const ButtonScroll: React.FC<Props> = ({ children, onClick, variations, right }) => {
  const large = 'h-full w-8 inline-flex items-center p-1 border border-transparent drop-shadow-lg text-gray-900 bg-gray-50 hover:bg-gray-100 focus:outline-none';
  const round = 'h-8 w-8 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue hover:bg-blue focus:outline-none';
  let variationButton: any;

  switch (variations) {
    case 'large':
        variationButton = large
      break;
    case 'round':
        variationButton = round
      break;
  
    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${variationButton} ${right && 'justify-self-end'}`}
    >
     {children}
    </button>
  );
};

export default ButtonScroll;
