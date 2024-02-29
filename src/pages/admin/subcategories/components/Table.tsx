import { Menu, Transition } from '@headlessui/react';
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  activeSubCategory,
  fetchSubCategories,
} from '@redux/states/subcategoriesSlice';
import uiSlice, { showModal } from '@redux/states/uiSlice';
import { classNames } from '@utils/class-names';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Table = ({ data, tableRef }: { data: any; tableRef: any }) => {
  let dat = [];
  const [temp, setTemp] = useState([]);
  const [counter, setCounter] = useState(0);

  const uiMd = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();

  //method use for searching on the table
  const filter = (e: any) => {
    setTemp(data);
    let val = e.target.value.toString().toLowerCase();
    let count = 4;
    let keys = Object.keys(data[0]);
    setTemp(
      data.filter((item: any) => {
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

  //for edit o delete a subcategory
  const activeSC = (values: any) => {
    dispatch(activeSubCategory(values));
  };

  //assign the data at temp variable  for use to filter
  useEffect(() => {
    setTemp(data);
  }, [data]);

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
              className="min-w-[12rem] py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              #
            </th>
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Object &&
            Object.values(temp).map((s: any, index) => (
              <tr key={index} className="bg-white">
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600//.k sm:pr-6">
                  {s.id}
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600//.k sm:pr-6">
                  {s.name}
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Menu
                    as="div"
                    className="z-30 inline-block text-left object-contain"
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
                                  dispatch(showModal(false));
                                  activeSC({ id: s.id, name: s.name });
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
                                  dispatch(showModal(true)); //true to the modal's do Delete
                                  activeSC({ id: s.id, name: s.name });
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
      
      <table hidden ref={tableRef} className="min-w-full table-auto shadow-sm rounded-3xl ">
        <thead>
          <tr className="bg-gray-100">
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              #
            </th>
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Object &&
            Object.values(temp).map((s: any, index) => (
              <tr key={index} className="bg-white">
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600//.k sm:pr-6">
                  {s.id}
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600//.k sm:pr-6">
                  {s.name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
