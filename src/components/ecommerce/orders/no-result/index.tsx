import { EmojiSadIcon } from '@heroicons/react/outline';
import React from 'react';

interface Props {
  message: string;
}

export const NoResult: React.FC<Props> = ({ message }) => {
  return (
    <div className="mt-16 flex space-x-4 justify-center items-center">
      <EmojiSadIcon className="h-24 w-24 text-blue" />
      <div className="sm:ml-6">
        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-600 sm:text-5xl">
            {message}
          </h1>
          <p className="mt-1 text-base text-gray-500">
          Por favor, compruebe los datos ingresado e inténtelo de nuevo.
          </p>
        </div>
      </div>
    </div>
  );
};
