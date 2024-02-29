import { Menu, Transition } from '@headlessui/react';
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { classNames } from '@utils/class-names';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';

const Table = ({
  coupons,
  setId,
  setOpen,
  setName,
  setActive,
  setCoupons,
}: {
  coupons: any;
  setId: any;
  setOpen: any;
  setName: any;
  setActive: any;
  setCoupons: any;
}) => {
  const [temp, setTemp] = useState(coupons);

  useEffect(() => {
    setTemp(coupons);
  }, [coupons]);

  const filter = (e: any) => {
    setTemp(coupons);
    let val = e.target.value.toString().toLowerCase();
    let count = 4;
    let keys = Object.keys(coupons[0]);
    setTemp(
      coupons.filter((item: any) => {
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
      <table className="min-w-full  shadow-sm rounded-3xl z-1">
        <thead>
          <tr className="bg-gray-100">
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Código
            </th>
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left  text-sm font-semibold text-gray-900"
            >
              Descuento
            </th>
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              Fecha de Vencimiento
            </th>
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
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
                  {c.code}
                </td>
                <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                  {c.discount}
                </td>
                <td
                  className={classNames(
                    'whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600',
                    coupons.includes(c) ? 'text-sky-600' : 'text-gray-900'
                  )}
                >
                  {moment(c.deadline).format('DD/MM/YYYY')}
                </td>

                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Menu
                    as="div"
                    className=" z-50 inline-block text-left object-contain"
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
                                  setId(c.id);
                                  setOpen(true);
                                  setActive(true);
                                  setName(c.code);
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
    </>
  );
};

export default Table;
