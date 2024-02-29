import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import uiSlice, { showModal } from "@redux/states/uiSlice";
import { classNames } from "@utils/class-names";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DataTable = ({ data, columns, hasOptions }:{ data:any, columns:any, hasOptions:any }) => {
  let dat = [];
  const [temp, setTemp] = useState([]);
  const [counter, setCounter] = useState(0);

  const uiMd = useSelector((state:any) => state.ui);
  const dispatch = useDispatch();

  //method use for searching on the table
  const filter = (e:any) => {
    setTemp(data);
    let val = e.target.value.toString().toLowerCase();
    let count = 4;
    let keys = Object.keys(data[0]);
    setTemp(
      data.filter((item:any) => {
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

  //assign the data at temp variable  for use to filter
  useEffect(() => {
    setTemp(data);
  }, [data]);

  return (
    <>
      {columns.length > 0 && (
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
                {columns.map((c:any, index:any) => (
                  <th
                    scope="col"
                    key={index}
                    className="min-w-[12rem] py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
                  >
                    {c.name}
                  </th>
                ))}
                {hasOptions && (
                  <th
                    scope="col"
                    className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  ></th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Object.values(temp).map((obj, index) => (
                <tr key={index} className="bg-white">
                  {Object.values(obj).map((value:any, index2) => (
                    <td
                      key={index2}
                      className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600//.k sm:pr-6"
                    >
                      {value}
                    </td>
                  ))}
                  {hasOptions && (
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Menu
                        as="div"
                        className="relative z-30 inline-block text-left object-contain"
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
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "flex px-4 py-2 text-sm"
                                    )}
                                    onClick={() => {
                                      dispatch(showModal(false));
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
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "flex px-4 py-2 text-sm"
                                    )}
                                    onClick={() => {
                                      dispatch(showModal(true)); //true to the modal's do Delete
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
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default DataTable;
