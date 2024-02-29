import Link from 'next/link';
import React from 'react';

const NoShoppingCart = () => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Carrito
        </h1>
        <div className='flex flex-col justify-center items-center mt-8 md:items-start'>
          <span className='mt-4 md:mb-8 text-lg text-gray-700 mb-4'>Su carrito esta vacío</span>
          <div className='flex w-4/5 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
            <Link href="/">
              <a className="flex w-full sm:w-80 justify-center items-center uppercase px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue">
                Seguir Comprando
              </a>
            </Link>
            {/* <Link href="/auth/login">
              <a className="flex w-full justify-center items-center uppercase px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Iniciar sesión
              </a>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoShoppingCart;
