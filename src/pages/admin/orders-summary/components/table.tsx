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
  DotsVerticalIcon,
  ExclamationIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import Modal from '@components/Modal';
import { Field, Form, Formik } from 'formik';
import { MyTextInput } from '@common/MyTextInput';
import { classNames } from '@utils/class-names';
import { fetchData } from 'helpers/fetchData';
import getSessionStorage from '@utils/get-session-storage';
import { selectAuth } from '@redux/states/Auth';
import { useAppSelector } from '@redux/app/hooks';
import endPoints from '@services/api';
import Image from 'next/image';
import { send } from 'process';

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'text-gray-800',
};

export default function Table({
  status,
  tableRef,
}: {
  status: any;
  tableRef: any;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [guide, setGuide] = useState('');
  const [sendBy, setSendBy] = useState('');
  const [client, setClient] = useState('');
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [userType, setUserType] = useState('');
  const { user } = useAppSelector(selectAuth);
  const [detail, setDetail] = useState([]);
  const [total, setTotal] = useState(0);
  const [constOfShipping, setCostOfShipping] = useState(0);
  const getOrders = () => {
    const endpoint = '/common/orders_summary/' + status;
    setTransactions([]);

    setUserType(user.type);

    fetchData({ endpoint })
      .then((data) => {
        if (data.content) {
          setTransactions(data.content);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, [status]);

  useEffect(() => {
    let totalAmount = 0;
    let costOS = 0;
    detail.map((d: any) => {
      totalAmount += d.amount;
      costOS += d.costOfShipping;
    });

    setCostOfShipping(costOS);
    setTotal(totalAmount);
  }, [detail]);

  const getTotalA = (index: any) => {
    let totalAmount = 0;
    let costOS = 0;

    if (transactions) {
      transactions[index].detail.map((d: any) => {
        totalAmount += d.amount;
        costOS += d.costOfShipping;
      });
    }

    return totalAmount + costOS;
  };

  return (
    <>
      {/* Static sidebar for desktop */}
      {/* Page header */}

      <div className="">
        {/* Activity list (smallest breakpoint only) */}

        {/* Activity table (small breakpoint and up) */}
        <div className=" bg-white rounded-lg my-6  shadow-2xl shadow-gray-200  sm:block">
          <table
            style={{ zIndex: 2 }}
            className="min-w-full  divide-y divide-gray-200"
          >
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No.Guía
                </th>
                {userType === 'ADMINISTRATOR' && (
                  <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendedor
                  </th>
                )}
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enviado por
                </th>
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions &&
                transactions.map((transaction, index) => (
                  <tr key={index} className="bg-white">
                    <td className="max-w-0 w-full px-6 p whitespace-nowrap text-sm text-gray-900">
                      <div className="flex">
                        <a className="group inline-flex space-x-2 truncate text-sm">
                          <p className="text-gray-500 truncate group-hover:text-gray-900">
                            {transaction.guide}
                          </p>
                        </a>
                      </div>
                    </td>
                    {userType === 'ADMINISTRATOR' && (
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        {transaction.seller_name}
                      </td>
                    )}
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      {transaction.name}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      {transaction.cell_phone}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      {transaction.send_by}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      <b>Q {getTotalA(index).toFixed(2)}</b>
                    </td>
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
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'flex px-4 py-2 text-sm'
                                    )}
                                    onClick={() => {
                                      setDetail(transaction.detail);
                                      setGuide(transaction.guide);
                                      setSendBy(transaction.send_by);
                                      setClient(transaction.name);
                                      setOpen(true);
                                    }}
                                  >
                                    <EyeIcon
                                      className="mr-3 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span>Ver detalle</span>
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
            style={{ zIndex: 2 }}
            className="min-w-full  divide-y divide-gray-200"
          >
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No.Guía
                </th>
                {userType === 'ADMINISTRATOR' && (
                  <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendedor
                  </th>
                )}
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enviado por
                </th>
                <th className="px-6 py-3 bg-gray-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions &&
                transactions.map((transaction, index) => (
                  <tr key={index} className="bg-white">
                    <td className="max-w-0 w-full px-6 p whitespace-nowrap text-sm text-gray-900">
                      <div className="flex">
                        <a className="group inline-flex space-x-2 truncate text-sm">
                          <p className="text-gray-500 truncate group-hover:text-gray-900">
                            {transaction.guide}
                          </p>
                        </a>
                      </div>
                    </td>
                    {userType === 'ADMINISTRATOR' && (
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        {transaction.seller_name}
                      </td>
                    )}
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      {transaction.name}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      {transaction.cell_phone}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      {transaction.send_by}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      <b>Q {getTotalA(index).toFixed(2)}</b>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Pagination */}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <div className="space-y-20">
          {/* {orders.map((order) => ( */}
          <div>
            <div className="p-4 shadow w-full bg-gray-50">
              <h3 className="text-xl tracking-tight text-gray-900">
                Guía <b>{guide}</b>
              </h3>
              <table className="text-right">
                <tr>
                  <th>Cliente:</th>
                  <td>{client}</td>
                  <th> &nbsp;&nbsp;&nbsp;&nbsp;Enviado por:</th>
                  <td>{sendBy}</td>
                </tr>
              </table>
            </div>
            <table className="mt-2 w-full text-gray-500 sm:mt-2">
              <caption className="sr-only">Products</caption>
              <thead className="sr-only  bg-gray-50 text-left text-sm text-gray-500 sm:not-sr-only">
                <tr>
                  <th
                    scope="col"
                    className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                  >
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                  >
                    Descuento
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3 pr-8 font-normal sm:table-cell"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                {detail.map((d: any, index) => (
                  <tr key={index}>
                    <td className="py-6 pr-8 sm:table-cell">{d.quantity}</td>
                    <td className="py-6 pr-8">
                      <div className="flex items-start">
                        {/* <Image
                              src={endPoints.files.download + '/' + d.image}
                              className="col-start-2 col-end-3 sm:col-start-1 sm:row-start-1 sm:row-span-2 w-20 h-20 rounded-lg object-center object-cover sm:w-40 sm:h-40 lg:w-24 lg:h-24"
                              width={5}
                              height={5}
                            /> */}
                        <div>
                          <div className="font-medium text-gray-900">
                            {d.product}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className=" py-6 pr-8 sm:table-cell">
                      {d.price.toFixed(2)}
                    </td>
                    <td className=" py-6 pr-8 sm:table-cell">
                      {d.discount.toFixed(2)}
                    </td>
                    <td className=" py-6 pr-8 sm:table-cell">
                      {(d.quantity * d.price - d.discount).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="">
                  <td className="py-2 pr-8 sm:table-cell"></td>
                  <td className="py-2 pr-8"></td>
                  <td className=" py-2 pr-8 sm:table-cell"></td>
                  <td className=" py-2 pr-8 sm:table-cell">
                    <b>Costo de envío:</b>
                  </td>
                  <td className=" py-2 pr-8 sm:table-cell">
                    {constOfShipping.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 pr-8 sm:table-cell"></td>
                  <td className="py-2 pr-8"></td>
                  <td className=" py-2 pr-8 sm:table-cell"></td>
                  <td className=" py-2 pr-8 sm:table-cell">
                    <b>Total:</b>
                  </td>
                  <td className=" py-2 pr-8 sm:table-cell">
                    {(total + constOfShipping).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="bg-cblue-500 text-white p-2 rounded-lg my-6 right-0"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </button>
          </div>
          {/* ))} */}
        </div>
      </Modal>
    </>
  );
}
