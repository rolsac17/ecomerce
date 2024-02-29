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
import { Fragment, useState } from "react";
import * as Yup from "yup";
import { Dialog, Menu, Transition } from "@headlessui/react";
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
} from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Modal from "@components/Modal";
import { Field, Form, Formik } from "formik";
import { MyTextInput } from "@common/MyTextInput";
import { classNames } from "@utils/class-names";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "History", href: "#", icon: ClockIcon, current: false },
  { name: "Balances", href: "#", icon: ScaleIcon, current: false },
  { name: "Cards", href: "#", icon: CreditCardIcon, current: false },
  { name: "Recipients", href: "#", icon: UserGroupIcon, current: false },
  { name: "Reports", href: "#", icon: DocumentReportIcon, current: false },
];
const secondaryNavigation = [
  { name: "Settings", href: "#", icon: CogIcon },
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: "Pedido #12039",
    client: "Juan Jose Maeda",
    href: "#",
    amount: "Q5,000",
    currency: "GTQ",
    status: "Entregado",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  {
    id: 1,
    name: "Pedido #12039",
    client: "Juan Jose Maeda",
    href: "#",
    amount: "Q5,000",
    currency: "GTQ",
    status: "Entregado",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  {
    id: 1,
    name: "Pedido #12039",
    client: "Juan Jose Maeda",
    href: "#",
    amount: "Q5,000",
    currency: "GTQ",
    status: "Entregado",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  {
    id: 1,
    name: "Pedido #12039",
    client: "Juan Jose Maeda",
    href: "#",
    amount: "Q5,000",
    currency: "GTQ",
    status: "Entregado",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "text-gray-800",
};

export default function Table() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Static sidebar for desktop */}
      {/* Page header */}

      <div className="">
        {/* Activity list (smallest breakpoint only) */}
        <div className="bg-white rounded-lg sm:hidden">
          <ul
            role="list"
            className=" divide-y divide-gray-200  overflow-hidden shadow sm:hidden"
          >
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <a
                  href={transaction.href}
                  className="block  py-4  bg-white hover:bg-gray-50"
                >
                  <span className="flex items-center ">
                    <span className="flex-1 flex space-x-2 truncate">
                      <CashIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="flex flex-col text-gray-500 text-sm truncate">
                        <span className="truncate">{transaction.name}</span>
                        <span>
                          <span className="text-gray-900 font-medium">
                            {transaction.amount}
                          </span>{" "}
                          {transaction.currency}
                        </span>
                        <time dateTime={transaction.datetime}>
                          {transaction.date}
                        </time>
                      </span>
                    </span>
                    <ChevronRightIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <nav
            className="bg-white  py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Pagination"
          >
            <div className="flex-1 flex justify-between">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                Previous
              </a>
              <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                Next
              </a>
            </div>
          </nav>
        </div>

        {/* Activity table (small breakpoint and up) */}
        <div className="p-1 bg-white rounded-lg my-6  shadow-2xl shadow-gray-200 hidden sm:block">
          <div className="w-full bg-white mx-auto ">
            <div className="flex flex-col ">
              <div className="align-middle min-w-full overflow-x-auto  overflow-hidden sm:rounded-md">
                <table className="min-w-full  divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Vendedor
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Fecha
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Monto
                      </th>
                      <th
                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        &nbsp;
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="bg-white">
                        <td className="max-w-0 w-full px-6 p whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <a
                              href={transaction.href}
                              className="group inline-flex space-x-2 truncate text-sm"
                            >
                              <p className="text-gray-500 truncate group-hover:text-gray-900">
                                {transaction.client }
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          04/06/2022
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">
                            {transaction.amount}{" "}
                          </span>
                          {transaction.currency}
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
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "flex px-4 py-2 text-sm"
                                        )}
                                        onClick={() => {
                                          setOpen(true);
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
                                          setOpen(true);
                                        }}
                                      >
                                        <TrashIcon
                                          className="mr-3 h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span>Anular</span>
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
                {/* Pagination */}
                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">10</span> of{" "}
                      <span className="font-medium">20</span> results
                    </p>
                  </div>
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
            <CashIcon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Procesar Pago
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Realiza los pagos del mes!
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <Formik
                initialValues={{
                  name: "",
                }}
                onSubmit={(values) => {}}
                validationSchema={Yup.object({
                  name: Yup.string().required("El campo es requerido"),
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
                          value={10000}
                        />
                      </div>
                      <button
                        type="button"
                        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                          />
                        </svg>
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Agregar archivo (JPG, PNG O PDF)
                        </span>
                      </button>

                      {}
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => {}}
                        >
                          Cargar
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
        </div>
      </Modal>
    </>
  );
}
