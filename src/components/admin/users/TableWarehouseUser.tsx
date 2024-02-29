import { MySelect } from '@common/MySelect';
import { MyTextInput } from '@common/MyTextInput';
import Modal from '@components/Modal';
import { Menu, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import {
  DotsVerticalIcon,
  ExclamationIcon,
  IdentificationIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/solid';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';
import { classNames } from '@utils/class-names';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { mutate } from 'swr';
import getSessionStorage from 'utils/get-session-storage';
import * as Yup from 'yup';

const tableHeaders = ['Nombre', 'Estado'];

export interface UserAuthorization {
  userId: string;
  commissionType: string;
  commission: number;
  status: string;
}

export const TableWarehouseUser = ({
  userss,
  setUserss,
  changeStatus,
  setActive,
  setOpenDesc,
  tableRef,
}: {
  userss: any;
  setUserss: any;
  changeStatus: any;
  setActive: any;
  setOpenDesc: any;
  tableRef: any;
}) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const { user } = useAppSelector(selectAuth);
  const [temp, setTemp] = useState(userss);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
    setTemp(userss.sort((a:any, b:any) => (a.status < b.status ? 1 : a.status> b.status ? -1 : 0)));
  }, [userss]);

  const filter = (e: any) => {
    setSearch(e.target.value);
    setTemp(userss.sort((a:any, b:any) => (a.status < b.status ? 1 : a.status> b.status ? -1 : 0)));
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

  const authorization = (values: any) => {
    values.citiesId = parseInt(values.citiesId);
    if (user !== null) {
      fetch(`${endPoints.wharehouses.authorize}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.code === 'SUCCESSFUL_OPERATION') {
            getUsuarios();
            setOpen(false);
          } else {
          }
        });
    }
  };

  const getUsuarios = () => {
    let type: string = 'WAREHOUSE_USER';
    let status: string = 'ACTIVE';
    let offset: number = 0;
    let limit: number = 100;
    if (user !== null) {
      fetch(endPoints.users.getUsers(type, status, offset, limit), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setUserss(dat.content);
          }
        });
    }
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
        <tbody className="">
          {temp&& temp.map((u: any) => (
            <tr key={id}>
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
                    u.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800',
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
                            <>
                              {u.status === 'PENDING' ? (
                                <a
                                  onClick={() => {
                                    setId(u.id);
                                    setOpen(true);
                                  }}
                                  href="#"
                                  className="flex px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  <CheckIcon
                                    className=" h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />

                                  <span className="text-sm font-semibold text-gray-500">
                                    {' '}
                                    Autorizar
                                  </span>
                                </a>
                              ) : (
                                <a
                                  href="#"
                                  className="flex px-4 py-2 text-sm"
                                  onClick={() => {
                                    changeStatus(
                                      u.status === 'ACTIVE'
                                        ? 'LOCKED'
                                        : 'ACTIVE',
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
                            </>
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
        <tbody className="">
          {userss.map((u: any) => (
            <tr key={id}>
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
                    u.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800',
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
      <Modal open={open} setOpen={setOpen}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-green-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-1 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Autorizar Usuario
            </h3>
            <div className="mt-2">
              <p className=" text-sm text-gray-500">
                ingrese los siguientes datos para poder autorizar el usuario
              </p>
            </div>

            <Formik
              initialValues={{
                userId: id,
                commissionType: 'FIXED_FEE',
                commission: '',
                status: 'ACTIVE',
              }}
              onSubmit={(values: any) => {
                values.commission = parseFloat(values.commission);
                authorization(values);
              }}
              validationSchema={Yup.object({
                commission: Yup.number().required('El campo es requerido'),
              })}
            >
              {(formik) => (
                <>
                  <Form className="space-y-2 py-4">
                    {/* Campo de email */}
                    <MySelect
                      className="hidden"
                      label="Comision por"
                      name="commissionType"
                    >
                      <option selected value="FIXED_FEE">
                        Cuota fija
                      </option>
                    </MySelect>
                    <input
                      name="userId"
                      type="text"
                      autoComplete="off"
                      hidden
                    />
                    <MyTextInput
                      label="Comision"
                      name="commission"
                      type="number"
                      autoComplete="off"
                    />
                    {/* Campo de Clave */}
                    <div></div>
                    {}
                    <br />
                    <div className="mt-5 my-16 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Autorizar
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
};
