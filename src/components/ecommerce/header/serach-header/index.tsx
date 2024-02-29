import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const SearchHeader = () => {
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if( searchTerm.trim().length === 0 ) return;
    push(`/search/${ searchTerm }`);
  }

  return (
    <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
      <div className="max-w-lg w-full lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Buscar...
        </label>
        <div className="relative text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            value={ searchTerm }
            onChange={ (e) => setSearchTerm( e.target.value ) }
            onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
            id="search"
            className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue focus:ring-white focus:border-white sm:text-sm"
            placeholder="Buscar"
            type="search"
            name="search"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
