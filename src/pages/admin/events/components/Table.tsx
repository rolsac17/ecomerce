import { Menu, Transition } from '@headlessui/react';
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { classNames } from '@utils/class-names';
import moment from 'moment';
import React, { FC, Fragment, useEffect, useState } from 'react';

const Table = ({
  events,
  setId,
  setOpen,
  setName,
  setActive,
  setEvents,
  tableRef,
}: {
  events: any;
  setId: any;
  setOpen: any;
  setName: any;
  setActive: any;
  setEvents: any;
  tableRef: any;
}) => {
  const [temp, setTemp] = useState(events);

  useEffect(() => {
    setTemp(events);
  }, [events]);

  const filter = (e: any) => {
    setTemp(events);
    let val = e.target.value.toString().toLowerCase();
    let count = 4;
    let keys = Object.keys(events[0]);
    setTemp(
      events.filter((item: any) => {
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
    <>
      <div className="w-full py-4  text-left  text-sm font-semibold text-gray-900">
        <input
          placeholder="Buscar"
          className="appearance-none block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
          onChange={() => filter(event)}
        />
      </div>
      <table className="min-w-full table-auto shadow-sm rounded-3xl ">
        <thead>
          <tr className="bg-gray-100">
            <th
              scope="col"
              className="py-4 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Id
            </th>
            <th
              scope="col"
              className=" text-left  text-sm font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="text-left text-sm font-semibold text-gray-900"
            >
              Fecha Creacion
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {temp &&
            temp.map((c: any) => (
              <tr
                key={c.id}
                className={temp.includes(c) ? 'bg-white' : undefined}
              >
                <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium px-3 text-gray-600">
                  {c.id}
                </td>
                <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                  {c.name}
                </td>
                <td
                  className={classNames(
                    'whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600',
                    events.includes(c) ? 'text-cblue-500' : 'text-gray-900'
                  )}
                >
                  {moment(c.createdAt).format('DD/MM/YYYY')}
                </td>

                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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
                      <Menu.Items className="origin-top-right absolute right-24  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                  setId(c.id);
                                  setOpen(true);
                                  setActive(false);
                                  setName(c.name);
                                }}
                              >
                                <PencilAltIcon
                                  className="mr-3 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Actualizar</span>
                              </a>
                            )}
                          </Menu.Item>
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
                                  setId(c.id);
                                  setOpen(true);
                                  setActive(true);
                                  setName(c.name);
                                }}
                              >
                                <TrashIcon
                                  className="mr-3 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Eliminar</span>
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
      <table
        hidden
        ref={tableRef}
        className="min-w-full table-auto shadow-sm rounded-3xl "
      >
        <thead>
          <tr className="bg-gray-100">
            <th
              scope="col"
              className="py-4 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Id
            </th>
            <th
              scope="col"
              className=" text-left  text-sm font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="text-left text-sm font-semibold text-gray-900"
            >
              Fecha Creacion
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {temp &&
            temp.map((c: any) => (
              <tr
                key={c.id}
                className={temp.includes(c) ? 'bg-white' : undefined}
              >
                <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium px-3 text-gray-600">
                  {c.id}
                </td>
                <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                  {c.name}
                </td>
                <td
                  className={classNames(
                    'whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600',
                    events.includes(c) ? 'text-cblue-500' : 'text-gray-900'
                  )}
                >
                  {moment(c.createdAt).format('DD/MM/YYYY')}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
