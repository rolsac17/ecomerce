/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import * as Yup from 'yup';
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  ExclamationIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DotsVerticalIcon,
  EyeIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import Modal from '@components/Modal';
import { Field, Form, Formik, validateYupSchema } from 'formik';
import { MyTextInput } from '@common/MyTextInput';
import { selectAuth } from '@redux/states/Auth';
import { useAppSelector } from '@redux/app/hooks';
import endPoints from '@services/api';
import moment from 'moment';
import { classNames } from '@utils/class-names';
import Image from 'next/image';
import { MySelect } from '@common/MySelect';
import { data } from '@pages/admin/dashboard/components/PieChart';

export default function SellerWallet() {
  const { user } = useAppSelector(selectAuth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [typePayment, setTypePayment] = useState(false);
  const [type, setType] = useState(false);
  const [balance, setBalance] = useState(0);
  const [details, setDetails] = useState([]);
  const [voucher, setVoucher] = useState('');
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState(false);

  const getBanks = () => {
    if (user !== null) {
      fetch(endPoints.banks.get, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setBanks(dat.content);
          }
        });
    }
  };
  const getPendingPayments = () => {
    if (user !== null) {
      fetch(endPoints.payments.seller, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setBalance(dat.content.available);
            setDetails(dat.content.detail);
          } else {
          }
        });
    }
  };

  const makePayment = (values: any) => {
    if (user !== null) {
      fetch(`${endPoints.payments.request_payment}`, {
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
        .then((dat: any) => {
          console.log('data ' + dat.message);
          if (dat.message !== 'ERR_PAYMENTS_IN_PROCESS') {
            getPendingPayments();
            setOpen(false);
            setError(false);
          } else {
            setError(true);
          }
        });
    }
  };

  useEffect(() => {
    getBanks();
    getPendingPayments();
  }, []);

  return (
    <>
      {/* Static sidebar for desktop */}
      {/* Page header */}

      <div className="">
        <div className="mx-auto">
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white shadow-2xl shadow-gray-200 overflow-hidden  rounded-xl">
              <div className="p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-cblue-100 p-2 rounded-lg">
                    <ScaleIcon
                      className="h-8 w-8 md:h-6 md:w-6 sm:h-6 sm:w-6  text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-md font-medium text-gray-600 truncate">
                        Acumulado
                      </dt>
                      <dd>
                        <div className="text-3xl md:text-xl sm:text-2xl font-bold text-gray-900">
                          Q {balance}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setOpen(true)}
              className="bg-indigo-100 cursor-pointer text-cblue-500 hover:bg-cblue-100 hover:text-white  text-center shadow-2xl shadow-gray-200 overflow-hidden  rounded-xl"
            >
              <div className="my-10">
                <div className="flex items-center">
                  <div className=" w-0 flex-1">
                    <dl>
                      <dd>
                        <div className="text-3xl sm:text-xl md:text-2xl font-bold">
                          Retirar
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className=" mt-8 text-lg leading-6 font-medium text-gray-900 ">
          Movimientos
        </h2>

        {/* Activity list (smallest breakpoint only) */}

        {/* Activity table (small breakpoint and up) */}
        <div className="p-1 bg-white rounded-lg my-6  shadow-2xl shadow-gray-200  sm:block">
          <div className="w-full bg-white mx-auto ">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto  overflow-hidden sm:rounded-lg">
                <table className="min-w-full  divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Monto Solicitado
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Estatus
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Fecha Solicitud
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Fecha Autorización
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {details &&
                      details.map((transaction: any, index) => (
                        <tr key={index} className="bg-white">
                          <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex">
                              <span className="text-gray-900 font-medium">
                                Q {transaction.debit}{' '}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {transaction.status === 'IN_PROCESS' && (
                              <span className="p-2 bg-yellow-100 text-yellow-600 rounded-xl">
                                En Proceso
                              </span>
                            )}
                            {transaction.status === 'DONE' && (
                              <span className="p-2 bg-green-100 text-green-600 rounded-xl">
                                Realizado
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-900 font-medium">
                              {moment(transaction.requestPaymentDate).format(
                                'DD/MM/YYYY'
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-900 font-medium">
                              {transaction.status === 'IN_PROCESS' ? (
                                <>-</>
                              ) : (
                                <>
                                  {moment(transaction.paymentDoneDate).format(
                                    'DD/MM/YYYY'
                                  )}
                                </>
                              )}
                            </span>
                          </td>
                          {transaction.status === 'DONE' && (
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <Menu
                                as="div"
                                className=" z-30 inline-block text-left object-contain"
                              >
                                <div>
                                  <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                    <span className="sr-only">
                                      Open options
                                    </span>
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
                                              setOpenImage(true);
                                              setVoucher(transaction.voucher);
                                            }}
                                          >
                                            <EyeIcon
                                              className="mr-3 h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                            <span>Ver Voucher</span>
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
                {/* Pagination */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
            <CashIcon className="h-4 w-4 text-sky-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Retirar Saldo
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Puede retirar tu saldo disponible total o parcialmente, al
                hacerlo se generara una solicitud de retiro la cual deberá ser
                autorizado por el administrador.
              </p>
              <p className="text-sm text-cblue-500 font-extrabold my-2">
                Recuerda que el pago se realizará en un máximo de 3 días hábiles
              </p>
              <Formik
                initialValues={{
                  debit: 0,
                  banksId: 0,
                  accountNumber: '',
                  accountName: ''
                }}
                onSubmit={(values: any) => {
                  setError(false);
                  values.banksId = parseInt(values.banksId);
                  makePayment(values);
                }}
                validationSchema={Yup.object({
                  debit: Yup.number()
                    .required('Requerido')
                    .min(75, 'El monto minimo a retirar es de Q 75.00')
                    .max(
                      balance,
                      'El monto no puede ser mayor al total acumulado'
                    ),
                  banksId: Yup.number().required('Requerido'),
                  accountNumber: Yup.string().required('Requerido'),
                  accountName:Yup.string().required('Requerido'),
                })}
              >
                {({ values }) => (
                  <>
                    <Form className="space-y-5 py-5">
                      <div className="sm:col-span-1">
                        <span className="block text-sm font-medium text-gray-700 my-2">
                          Forma de Retiro
                        </span>
                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              className="form-radio text-sky-600 focus:ring-sky-500"
                              name="typepayment"
                              id="typepayment"
                              checked={typePayment === true ? true : false}
                              value="true"
                              onClick={() => {
                                setTypePayment(true);
                              }}
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              Total
                            </span>
                          </label>
                          <label className="inline-flex items-center ml-6">
                            <Field
                              type="radio"
                              className="form-radio text-sky-600 focus:ring-sky-500"
                              name="typepayment"
                              id="typepayment"
                              checked={typePayment === false ? true : false}
                              value="false"
                              onClick={() => setTypePayment(false)}
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              Parcial
                            </span>
                          </label>
                        </div>
                      </div>

                      {typePayment === true ? (
                        <div className="sm:col-span-1">
                          <div className="mt-1">
                            <MyTextInput
                              label=""
                              name="debit"
                              type="number"
                              autoComplete="off"
                              value={(values.debit = balance)}
                              disabled={true}
                              className="block w-full  border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="sm:col-span-1">
                          <div className="mt-1">
                            <MyTextInput
                              label=""
                              name="debit"
                              type="number"
                              autoComplete="off"
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      )}
                      <div className="sm:col-span-1">
                        {' '}
                        <div className="mt-1 my-2">
                          <MySelect
                            name="banksId"
                            label="Banco"
                            col="col-span-6 md:col-span-3"
                          >
                            <option value="">Selecciona un Banco</option>
                            {banks.map(
                              ({ id, name }: { id: any; name: any }) => (
                                <option key={id} value={id}>
                                  {name}
                                </option>
                              )
                            )}
                          </MySelect>
                        </div>
                        <div className="mt-1">
                          <MyTextInput
                            label="Numero de cuenta"
                            name="accountNumber"
                            type="text"
                            autoComplete="off"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                        </div>
                        {error && (
                          <small className="text-red-500 font-normal ">
                            Ya existe una transaccion en proceso!
                          </small>
                        )}
                         <div className="mt-1">
                          <MyTextInput
                            label="Nombre de la cuenta"
                            name="accountName"
                            type="text"
                            autoComplete="off"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      {}
                      <div className="mt-5 my-4 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cblue-500 text-base font-medium text-white hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Retirar
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={() => {
                            setOpen(false);
                            setError(false);
                          }}
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
        </div>
      </Modal>
      <Modal open={openImage} setOpen={setOpenImage}>
        <div className="sm:flex sm:items-start">
          <div className="text-center col-span-12">
            <div className="col-span-12">
              {' '}
              <Image
                className="cursor-pointer"
                width={500}
                height={600}
                src={voucher}
                onClick={() =>
                  window.open(voucher, '_blank', 'noopener,noreferrer')
                }
              />
            </div>
            <div className="col-span-12 w-full">
              <button
                type="button"
                className=" w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setOpenImage(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
