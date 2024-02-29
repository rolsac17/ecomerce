import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    // <footer aria-labelledby="footer-heading" className="bg-gray-50">
    //   <div className="border-t border-gray-100 py-10 text-center">
    //     <p className="text-sm text-gray-500">
    //       &copy; {year} Weexa, Inc. Todos los derechos reservados.
    //     </p>
    //   </div>
    // </footer>
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          <div className="px-5 py-2">
            <Link href="/warehouses" passHref>
              <a className="text-base text-gray-500 hover:text-gray-900">
                Almacenes
              </a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/sellers" passHref>
              <a className="text-base text-gray-500 hover:text-gray-900">
                Vendedores
              </a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/about" passHref>
              <a className="text-base text-gray-500 hover:text-gray-900">
                Nosotros
              </a>
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link href="/terms" passHref>
              <a className="text-base text-gray-500 hover:text-gray-900">
                Términos y Condiciones
              </a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/contacus" passHref>
              <a className="text-base text-gray-500 hover:text-gray-900">
                Contacta con Nosotros
              </a>
            </Link>
          </div>
        </nav>
        <div className="border-t border-gray-100 py-10 text-center">
          <p className="text-sm text-gray-500"> WEEXA</p>
        </div>
      </div>
    </footer>
  );
};
