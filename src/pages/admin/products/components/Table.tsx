import { Menu, Transition } from '@headlessui/react';
import {
  CheckIcon,
  DotsVerticalIcon,
  IdentificationIcon,
  PencilAltIcon,
  StopIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import InformationUser from '@pages/admin/users/components/InformationUser';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { classNames } from '@utils/class-names';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InformacionProduct from './InformationProduct';

const Table = ({
  data,
  changeAvailability,
  tableRef,
  getProducts,
  Filters,  
  setMessage,
  setShow
}: {
  data: any;
  changeAvailability: any;
  tableRef: any;
  getProducts: any;
  Filters: any;
  setMessage:any;
  setShow:any;
}) => {
  let dat = [];
  const [temp, setTemp] = useState([]);
  const [counter, setCounter] = useState(0);
  const [actives, setActive] = useState({});
  const [openDesc, setOpenDesc] = useState(false);
  const { user } = useAppSelector(selectAuth);

  const uiMd = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();


  //assign the data at temp variable  for use to filter
  useEffect(() => {
    setTemp(data);
  }, [data]);

  return (
    <>
      <table className="min-w-full table-auto shadow-sm rounded-3xl ">
        <thead>
          <tr className="bg-gray-100">
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Código
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Precio
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Categoría
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Subcategoría
            </th>
            <th
              scope="col"
              className="py-3.5 pr-3 text-left text-sm sm:text-xs font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data &&Object.values(data).map((s: any, index) => (
            <tr key={index} className="bg-white">
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.internalId}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.name} <br/>
                {s.inventary && <>Cantidad: <b>{s.stock}</b></>}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.price}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.category}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.subcategory}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                <Menu
                  as="div"
                  className=" z-30 inline-block text-left object-contain"
                >
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Abrir Opciones</span>
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
                                setActive(s);
                                setOpenDesc(true);
                              }}
                            >
                              <IdentificationIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Ver Detalle</span>
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
                                changeAvailability(
                                  s.status === 'NOT_AVAILABLE' ? true : false,
                                  s.id
                                );
                              }}
                            >
                              {s.status === 'NOT_AVAILABLE' ? (
                                <>
                                  <CheckIcon
                                    className="mr-3 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Marcar como Disponible</span>
                                </>
                              ) : (
                                <>
                                  <StopIcon
                                    className="mr-3 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Marcar como no Disponible</span>
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

      <table
        hidden
        ref={tableRef}
        className="min-w-full table-auto shadow-sm rounded-3xl "
      >
        <thead>
          <tr className="bg-gray-100">
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Código
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Cantidad
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Precio
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Categoría
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm sm:text-xs font-semibold text-gray-900"
            >
              Subcategoría
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Object.values(temp).map((s: any, index) => (
            <tr key={index} className="bg-white">
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.internalId}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.name}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.stock}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.price}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.category}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:text-xs font-normal text-gray-600">
                {s.subcategory}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <InformacionProduct
        open={openDesc}
        active={actives}
        Filters={Filters}
        getProducts={getProducts}
        setOpen={setOpenDesc}
        setMessage={setMessage}
        setShow={setShow}
      />
    </>
  );
};

export default Table;
