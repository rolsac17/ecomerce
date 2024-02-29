import Link from 'next/link';
import React from 'react';

export const HeadOrder = () => {
  return (
    <div className="mt-16 flex flex-col space-y-4 justify-between md:flex-row">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Historial de Ordernes
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Consulta el estado de los pedidos recientes, gestiona las devoluciones
          y descubre productos similares.
        </p>
      </div>
      <Link href="/">
        <a className="flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greenBlue">
          Seguir Comprando
        </a>
      </Link>
    </div>
  );
};
