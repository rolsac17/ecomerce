import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import endPoints from '@services/api';
import { classNames } from '@utils/class-names';
import { format } from '@utils/currency';
import { IPublicOrder, IPublicOrderDetail } from 'interfaces/IPublicOrder';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';

export interface Props {
  orderPublic: IPublicOrder;
}

export const CardOrder: React.FC<Props> = ({ orderPublic }) => {
  return (
    <>
      <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
        <h3 className="sr-only">
          Order placed on{' '}
          <time dateTime={orderPublic.createdAt}>{orderPublic.createdAt}</time>
        </h3>

        <div className="flex items-start border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
          <dl className="flex-1 flex-col gap-x-6 text-sm sm:col-span-3 sm:flex sm:flex-row lg:col-span-2">
            <div>
              <dt className="font-medium text-gray-900">Numero de Orden</dt>
              <dd className="mt-1 text-gray-500">{orderPublic.orderId}</dd>
            </div>
            <div className="hidden sm:block">
              <dt className="font-medium text-gray-900">Fecha</dt>
              <dd className="mt-1 text-gray-500">
                <time dateTime={orderPublic.createdAt.substr(0, 10)}>
                  {orderPublic.createdAt.substr(0, 10)}
                </time>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Dirección</dt>
              <dd className="mt-1 text-gray-500">
                {orderPublic.shippingAddress}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Consto de envió</dt>
              <dd className="mt-1 text-gray-500">
                {format(orderPublic.costOfShipping)}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Total</dt>
              <dd className="mt-1 font-medium text-gray-900">
                {format(orderPublic.total)}
              </dd>
            </div>
          </dl>

          <Menu as="div" className="relative flex justify-end lg:hidden">
            <div className="flex items-center">
              <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">
                  Options for order {orderPublic.orderId}
                </span>
                <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={`/shipments/${orderPublic.orderId}`} passHref>
                        <a
                          target="_blank"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Ver envíos
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
            <Link href={`/shipments/${orderPublic.orderId}`}>
              <a
                target="_blank"
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>Ver Envíos</span>
                <span className="sr-only">{orderPublic.orderId}</span>
              </a>
            </Link>
          </div>
        </div>
        {/* Products */}
        <h4 className="sr-only">Items</h4>
        <ul role="list" className="divide-y divide-gray-200">
          {orderPublic.detail?.map((det: IPublicOrderDetail) => (
            <li key={det.productName} className="p-4 sm:p-6">
              <div className="flex items-center sm:items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                  {det?.productImages
                    .filter((img) => img.principal === true)
                    .map((img) => (
                      <Image
                        key={img.key}
                        src={`${endPoints.files.download}/${img.key}`}
                        alt={det.productDescription}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                      />
                    ))}
                </div>
                <div className="flex-1 ml-6 text-sm">
                  <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                    <h5>{det.productName}</h5>
                    <p className="mt-2 sm:mt-0">{format(det.price)}</p>
                  </div>
                  <p className="hidden text-gray-500 sm:block sm:mt-2">
                    {det.productDescription}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:flex sm:justify-end">
                <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                  <div className="flex-1 flex justify-center">
                    <Link href={`/product/${det.productId}`}>
                      <a className="text-blue whitespace-nowrap hover:text-greenBlue">
                        Comprar nuevamente
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
