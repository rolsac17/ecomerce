/* This example requires Tailwind CSS v2.0+ */
import { ViewListIcon } from '@heroicons/react/outline';
import { CheckIcon, MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';
import { classNames } from '@utils/class-names';
import { useEffect, useState } from 'react';
import getSessionStorage from 'utils/get-session-storage';
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
  setReturned,
  orders,
  setLimit,
  PAGE_LIMIT,
  limit,
  isLoading,
  setIsLoading,
}: {
  setOpen: any;
  setActive: any;
  setOpenD: any;
  setReturned: any;
  orders: any;
  setLimit: any;
  PAGE_LIMIT: any;
  limit: any;
  isLoading: any;
  setIsLoading: any;
}) {
  const [temp, setTemp] = useState(orders);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
    setTemp(
      orders.sort((a: any, b: any) =>
        a.status < b.status ? 1 : a.status > b.status ? -1 : 0
      )
    );
  }, [orders]);

  const filter = (e: any) => {
    setSearch(e.target.value);
    setTemp(
      orders.sort((a: any, b: any) =>
        a.status < b.status ? 1 : a.status > b.status ? -1 : 0
      )
    );
    let val = e.target.value.toString().toLowerCase();
    let count = 10;
    let keys = Object.keys(orders[0]);
    setTemp(
      orders.filter((item: any) => {
        for (let i = 0; i < count; i++) {
          if (
            (item[keys[i]] &&
              item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
            !val
          ) {
            return true;
          }
        }
      })
    );
  };

  //method use to filter product by warehouse
  const getProducts = () => {};

  return (
    <>
      <div className="w-full py-5  text-left  text-sm font-semibold text-gray-900">
        <input
          placeholder="Buscar"
          value={search}
          className="appearance-none block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
          onChange={() => filter(event)}
        />
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
      >
        {temp &&
          temp.map((o: any, index: any) => (
            <li
              key={index}
              className="col-span-1 flex flex-col   bg-white rounded-lg shadow-md divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-3">
                <div className="w-full">
                  <p className="text-sm col-span-11 font-medium text-gray-600">
                    Pedido #{o.id}
                    {o.status === 'SEND' && (
                      <span className="text-blue-500 bg-blue-50 rounded-md mx-4 p-2 text-xs  text-center font-medium">
                        {' '}
                        Enviado
                      </span>
                    )}
                    {o.status === 'DELIVERED' && (
                      <span className="text-green-500 bg-green-50 rounded-md mx-4 p-2 text-xs  text-center font-medium">
                        {' '}
                        Entregado
                      </span>
                    )}
                    {o.status === 'RETURNED' && (
                      <span className="text-red-500 bg-red-50 rounded-md p-2  mx-4 text-xs  text-center font-medium">
                        {' '}
                        Retornado
                      </span>
                    )}
                  </p>
                </div>
                <div className="w-full h-52 my-3 px-2 bg-gray-50 rounded-md">
                  <h3 className="my-2 text-gray-600 text-xs font-medium">
                    {o.clientName} {o.clientSurnames}
                  </h3>
                  <h3 className="my-1 text-gray-500 text-xs font-medium">
                    Dirección
                  </h3>
                  <dd className="text-gray-400 text-xs">{o.shippingAddress}</dd>
                  <h3 className="text-gray-500 text-xs my-1 font-medium">
                    Teléfono
                  </h3>
                  <dd className="text-gray-400 text-xs">
                    # {o.clientCellPhone}
                  </dd>
                   <h3 className="text-gray-500 text-xs my-1 font-medium">
                    Total
                  </h3>
                  <dd className="text-gray-400 text-xs">
                    Q {parseFloat(o.totalAmount).toFixed(2)}
                  </dd>
                </div>

                <button
                  onClick={() => {
                    setActive(o);
                    setReturned(false);
                    setOpen(true);
                  }}
                  className="w-full p-2 my-2 bg-cblue-50 text-sm text-white font-medium rounded-md hover:bg-cblue-100"
                >
                  Ver detalle
                </button>
              </div>
            </li>
          ))}
      </ul>
      {orders && (
        <div
          className={classNames(
            orders.length < limit ? 'hidden' : 'flex',
            'w-full py-8 justify-center'
          )}
        >
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              setLimit((prev: any) => prev + PAGE_LIMIT);
            }}
            className="w-48 flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Ver mas
          </button>
        </div>
      )}
    </>
  );
}
