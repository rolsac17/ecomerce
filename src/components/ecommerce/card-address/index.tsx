import React from 'react';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@redux/app/hooks';
import { selectCart } from '@redux/states/cartSlice';

const CardAddress = () => {
  const { shoppingAddress } = useAppSelector(selectCart);
  const addressComplete = `${shoppingAddress?.shippingAddress}, ${shoppingAddress?.cityName}, ${shoppingAddress?.stateName}, ${shoppingAddress?.countryName}`;
  return (
    <div className="bg-white shadow rounded-lg mt-4">
      <div className="px-4 py-5">
        <div className="flow-root">
          <dl className="-my-4 text-sm divide-y divide-gray-200">
            <div className="flex items-center justify-end mb-2">
              <Link href="/checkout/address">
                <a className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-blue-400 bg-white hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span>Editar</span>
                  <PencilIcon
                    className="-mr-1 ml-2 h-5 w-5 text-blue-400"
                    aria-hidden="true"
                  />
                </a>
              </Link>
            </div>
            <div className="py-4 flex space-x-2 flex-col md:flex-row items-center justify-between">
              <dt className="text-gray-600">Contacto</dt>
              <dd className="font-medium text-gray-900">
                {shoppingAddress?.email}
              </dd>
            </div>
            <div className="py-4 flex space-x-2 flex-col md:flex-row items-center justify-between">
              <dt className="text-gray-600">Enviar a</dt>
              <dd className="font-medium text-gray-900">{addressComplete}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CardAddress;
