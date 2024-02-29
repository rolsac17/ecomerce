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
import * as Yup from 'yup';
import { Dialog, Menu, Transition } from '@headlessui/react';
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
  OfficeBuildingIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import Modal from '@components/Modal';
import { Field, Form, Formik } from 'formik';
import { MyTextInput } from '@common/MyTextInput';
import getSessionStorage from '@utils/get-session-storage';
import endPoints from '@services/api';
import { classNames } from '@utils/class-names';
import FormData from 'form-data';
import { sendData } from 'helpers/sendData';
import { addImages } from '@redux/states/incomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import moment from 'moment';
const Table = ({ tableRef }: { tableRef: any }) => {
  const { user } = useAppSelector(selectAuth);
  const formData = new FormData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const paymentImage = useSelector((state: any) => state.payment.image);
  const [warehousePaymentId, setWarehousePaymentId] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [voucher, setVoucher] = useState('');
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [temp, setTemp] = useState<any[]>([]);

  useEffect(() => {
    setSearch('');
    setTemp(transactions);
  }, [transactions]);

  const filter = (e: any) => {
    setSearch(e.target.value);
    setTemp(transactions);
    let val = e.target.value.toString().toLowerCase();
    let count = 11;
    let keys = Object.keys(transactions[0]);
    setTemp(
      transactions.filter((item: any) => {
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

  const getPendingPayments = () => {
    if (user !== null) {
      fetch(endPoints.payments.requested_payment, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setTransactions(dat.content);
          } else {
            setTransactions([]);
          }
        });
    }
  };

  //action to upload a new image
  const uploadLogo = (e: any) => {
    formData.append('file', e.target.files[0]);
    const endpoint = '/common/files';

    sendData({ method: 'POST', endpoint, body: formData })
      .then((data) => {
        setVoucher(endPoints.files.download + '/' + data.content.key);
        dispatch(
          addImages({
            key: data.content.key,
            fileLoading: URL.createObjectURL(e.target.files[0]),
            load: false,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const makePayment = () => {
    if (user !== null) {
      fetch(`${endPoints.payments.seller_payment(warehousePaymentId)}`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voucher: voucher,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          getPendingPayments();
          setOpen(false);
        });
    }
  };

  useEffect(() => {
    getPendingPayments();
  }, []);

  return (
    <>
      {/* Static sidebar for desktop */}
      {/* Page header */}

      <div className="">
        {/* Activity list (smallest breakpoint only) */}

        {/* Activity table (small breakpoint and up) */}
        <div className="w-full   text-left  text-sm font-semibold text-gray-900">
          <input
            placeholder="Buscar"
            value={search}
            className="appearance-none block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
            onChange={() => filter(event)}
          />
        </div>
        <div className="p-1 bg-white rounded-lg my-6   shadow-2xl shadow-gray-200  ">
          <div className="w-full bg-white mx-auto ">
            <div className="h-auto">
              <div className="min-w-full h-96 lg:min-h-0 overflow-x-auto z-0 overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Solicitud
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Vendedor
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Banco
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Cuenta
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                       Nombre Cuenta
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Teléfono
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Correo
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
                        Monto
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {temp &&
                      temp.map((transaction) => (
                        <tr key={transaction.id} className="bg-white">
                          <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex">
                              <a className="group inline-flex space-x-2 truncate text-sm">
                                <p className="text-gray-500 truncate group-hover:text-gray-900">
                                  #{transaction.paymentId}
                                </p>
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {transaction.sellerName}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {transaction.bank}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {transaction.accountNumber}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {transaction.accountName}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {transaction.sellerCellPhone}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {transaction.sellerEmail}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {moment(transaction.cutoffDate).format(
                              'DD/MM/YYYY'
                            )}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-900 font-medium">
                              Q {transaction.debit}{' '}
                            </span>
                          </td>
                          {transaction.status === 'IN_PROCESS' && (
                            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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
                                  enterFrom="transform opacity-0 scale-10"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="origin-top  absolute z-30 right-12 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                              setOpen(true);
                                              setWarehousePaymentId(
                                                transaction.paymentId
                                              );
                                              setAmountPaid(transaction.debit);
                                            }}
                                          >
                                            <CashIcon
                                              className="mr-3 h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                            <span>Pagar</span>
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
                <table
                  hidden
                  ref={tableRef}
                  className="min-w-full divide-y divide-gray-200 "
                >
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Solicitud
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Vendedor
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Banco
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Cuenta
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Teléfono
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Correo
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
                        Monto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="bg-white">
                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <a className="group inline-flex space-x-2 truncate text-sm">
                              <p className="text-gray-500 truncate group-hover:text-gray-900">
                                #{transaction.paymentId}
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          {transaction.sellerName}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          {transaction.bank}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          {transaction.accountNumber}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          {transaction.sellerCellPhone}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          {transaction.sellerEmail}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          {moment(transaction.cutoffDate).format('DD/MM/YYYY')}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">
                            Q {transaction.debit}{' '}
                          </span>
                        </td>
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
              Procesar Pago
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Realiza los pagos del mes
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <Formik
                initialValues={{
                  name: '',
                }}
                onSubmit={(values) => {}}
                validationSchema={Yup.object({
                  name: Yup.string().required('El campo es requerido'),
                })}
              >
                {(formik) => (
                  <>
                    <Form className="space-y-4 py-5">
                      <div className="sm:col-span-1 w-full">
                        <MyTextInput
                          label="Pago"
                          id="Pago"
                          name="Pago"
                          disabled={true}
                          value={amountPaid}
                        />
                      </div>
                      <button
                        type="button"
                        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        {paymentImage.key !== null && (
                          <Image
                            className="w-full h-full object-center object-cover rounded-lg"
                            src={
                              endPoints.files.download + '/' + paymentImage.key
                            }
                            alt=""
                            layout="fill"
                          />
                        )}
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Agregar Archivo (JPG, PNG O PDF)
                          <input
                            type="file"
                            onChange={uploadLogo}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                          />
                        </span>
                      </button>

                      {}
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => makePayment()}
                        >
                          Cargar
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:w-auto sm:text-sm"
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
        </div>
      </Modal>
    </>
  );
};

export default Table;
