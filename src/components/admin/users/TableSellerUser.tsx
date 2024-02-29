import { Menu, Transition } from '@headlessui/react';
import {
  DotsVerticalIcon,
  IdentificationIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilAltIcon,
} from '@heroicons/react/solid';
import { classNames } from '@utils/class-names';
import React, { FC, Fragment, useEffect, useState } from 'react';

const tableHeaders = ['Nombre', 'Estado'];

export const TableSellerUser = ({
  userss,
  setOpen,
  setActive,
  type,
  setUserss,
  changeStatus,
  setOpenDesc,
  tableRef,
}: {
  userss: any;
  setOpen: any;
  setActive: any;
  type: any;
  setUserss: any;
  changeStatus: any;
  setOpenDesc: any;
  tableRef: any;
}) => {
  const [temp, setTemp] = useState(userss);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
    setTemp(userss);
  }, [userss]);

  const filter = (e: any) => {
    setSearch(e.target.value);
    setTemp(userss);
    let val = e.target.value.toString().toLowerCase();
    let count = 18;
    let keys = Object.keys(userss[0]);
    setTemp(
      userss.filter((item: any) => {
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
  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <div className="w-full py-4  text-left  text-sm font-semibold text-gray-900">
        <input
          placeholder="Buscar"
          value={search}
          className="appearance-none block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
          onChange={() => filter(event)}
        />
      </div>
      <table className="min-w-full shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaders.map((headers) => (
              <th
                key={`#Header${headers}`}
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                {headers}
              </th>
            ))}
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {temp &&
            temp.map((u: any) => (
              <tr key={u.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-gray-900">
                        {`${u.name} ${u.surnames}`}
                      </div>
                      <div className="text-gray-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span
                    className={classNames(
                      u.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 ext-red-800',
                      'inline-flex rounded-full px-2 text-xs font-semibold leading-5 '
                    )}
                  >
                    {u.status}
                  </span>
                </td>
                <td className=" whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Menu
                    as="div"
                    className=" z-30 inline-block text-left object-contain"
                  >
                    <div>
                      <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
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
                      <Menu.Items className="origin-top-right absolute right-24 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'flex px-4 py-2 text-sm'
                                )}
                                onClick={() => {
                                  setActive(u);
                                  setOpenDesc(true);
                                }}
                              >
                                <IdentificationIcon
                                  className=" h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="text-sm font-semibold text-gray-500">
                                  {' '}
                                  Ver Detalle
                                </span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className="flex px-4 py-2 text-sm"
                                onClick={() => {
                                  changeStatus(
                                    u.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE',
                                    u.id
                                  );
                                }}
                              >
                                {u.status === 'ACTIVE' ? (
                                  <>
                                    <LockClosedIcon
                                      className=" h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />

                                    <span className="text-sm font-semibold text-gray-500">
                                      {' '}
                                      Bloquear
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <LockOpenIcon
                                      className=" h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="text-sm font-semibold text-gray-500">
                                      {' '}
                                      Desbloquear
                                    </span>
                                  </>
                                )}
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <table hidden ref={tableRef} className="min-w-full shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaders.map((headers) => (
              <th
                key={`#Header${headers}`}
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                {headers}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {userss.map((u: any) => (
            <tr key={u.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div>
                    <div className="font-medium text-gray-900">
                      {`${u.name} ${u.surnames}`}
                    </div>
                    <div className="text-gray-500">{u.email}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span
                  className={classNames(
                    u.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 ext-red-800',
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5 '
                  )}
                >
                  {u.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
