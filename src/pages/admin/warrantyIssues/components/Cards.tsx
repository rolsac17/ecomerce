/* This example requires Tailwind CSS v2.0+ */
import { ViewListIcon } from '@heroicons/react/outline';
import { CheckIcon, MailIcon, PhoneIcon } from '@heroicons/react/solid';
import endPoints from '@services/api';
import { useEffect, useState } from 'react';
import Orders from '..';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
];

export default function Cards({
  setOpen,
  setActive,
  setOpenD,
  orders,
  setOrders,
}: {
  setOpen: any;
  setActive: any;
  setOpenD: any;
  orders: any;
  setOrders: any;
}) {
  //method use to filter product by warehouse
  const getProducts = () => {};

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
    >
      {orders &&
        orders.map(
          (o: any, index: any) =>
            o.detail !== null && (
              <li
                key={index}
                className="col-span-1 flex flex-col   bg-white rounded-lg shadow-md divide-y divide-gray-200"
              >
                <div className="flex-1 flex flex-col p-3">
                  <div className="w-full">
                    <p className="text-sm col-span-11 font-medium text-gray-600">
                      Pedido #{o.id}
                    </p>
                  </div>
                  <div className="w-full h-48 my-2 p-2 bg-gray-50 rounded-md">
                    <h3 className="my-2 text-gray-600 text-xs font-medium">
                      {o.clientName} {o.clientSurnames}
                    </h3>
                    <h3 className="my-1 text-gray-500 text-xs font-medium">
                      Direccion
                    </h3>
                    <dd className="text-gray-400 text-xs">
                      {o.shippingAddress}
                    </dd>
                    <h3 className="text-gray-500 text-xs my-1 font-medium">
                      Telefono
                    </h3>
                    <dd className="text-gray-400 text-xs">
                      # {o.clientCellPhone}
                    </dd>
                    <h3 className="text-gray-500 text-xs my-1 font-medium">
                      Total
                    </h3>
                    <dd className="text-gray-400 text-xs">Q  {o.totalAmount}</dd>
                  </div>

                  {/* <button onClick={()=> {
              setActive(o);
              setOpenD(true);
              
            }} className="w-full p-2  bg-gray-100 text-sm text-gray-500 font-medium rounded-md hover:bg-gray-300">
              Anular
            </button> */}
                  <button
                    onClick={() => {
                      setActive(o);
                      setOpen(true);
                    }}
                    className="w-full p-2 my-2 bg-cblue-500 text-sm text-white font-medium rounded-md hover:bg-cblue-100"
                  >
                    Ver detalle
                  </button>
                </div>
              </li>
            )
        )}
    </ul>
  );
}
