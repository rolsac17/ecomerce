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
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
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
  OfficeBuildingIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import moment from 'moment';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'History', href: '#', icon: ClockIcon, current: false },
  { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
  { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Reports', href: '#', icon: DocumentReportIcon, current: false },
];
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];
const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: 'Almacen de zapatos',
    href: '#',
    amount: 'Q5,000',
    currency: 'GTQ',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 1,
    name: 'Almacen de zapatos',
    href: '#',
    amount: 'Q5,000',
    currency: 'GTQ',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 1,
    name: 'Almacen de zapatos',
    href: '#',
    amount: 'Q5,000',
    currency: 'GTQ',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 1,
    name: 'Almacen de zapatos',
    href: '#',
    amount: 'Q5,000',
    currency: 'GTQ',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 1,
    name: 'Almacen de zapatos',
    href: '#',
    amount: 'Q5,000',
    currency: 'GTQ',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 1,
    name: 'Almacen de zapatos',
    href: '#',
    amount: 'Q5,000',
    currency: 'GTQ',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
];
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'text-gray-800',
};

export default function AdminWallet() {
  const { user } = useAppSelector(selectAuth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState('');

  


  const getDate = () => {
    let nextMonth = moment().add(1, 'month').format('01/MM/YYYY');

    setDate(nextMonth.toString());
  };

  useEffect(() => {
    getDate();
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
                  <div className="flex-shrink-0 bg-sky-700 p-2 rounded-lg">
                    <ScaleIcon
                      className="h-8 w-8 md:h-6 md:w-6  text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-md font-medium text-gray-600 truncate">
                        Total vendido
                      </dt>
                      <dd>
                        <div className="text-3xl  md:text-xl sm:text-2xl font-bold text-gray-900">
                          Q 10,000.00
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white  shadow-2xl shadow-gray-200 overflow-hidden  rounded-xl">
              <div className="p-7">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 bg-sky-900 rounded-lg">
                    <CreditCardIcon
                      className="h-8 w-8  md:h-6 md:w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-md font-medium text-gray-600 truncate">
                        Total pagado
                      </dt>
                      <dd>
                        <div className="text-3xl   md:text-xl sm:text-2xl font-bold text-gray-900">
                          Q 5,000.00
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white  shadow-2xl shadow-gray-200 overflow-hidden  rounded-xl">
              <div className="p-7">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 bg-sky-900 rounded-lg">
                    <CreditCardIcon
                      className="h-8 w-8  md:h-6 md:w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-md font-medium text-gray-600 truncate">
                        Total a pagar
                      </dt>
                      <dd>
                        <div className="text-3xl   md:text-xl sm:text-2xl font-bold text-gray-900">
                          Q 5,000.00
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
          Envios
        </h2>

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
                        Almacen
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
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="bg-white">
                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <a
                              href={transaction.href}
                              className="group inline-flex space-x-2 truncate text-sm"
                            >
                              <p className="text-gray-500 truncate group-hover:text-gray-900">
                                {transaction.name}
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">
                            {transaction.amount}{' '}
                          </span>
                          {transaction.currency}
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
    </>
  );
}
