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
import { fetchData } from 'helpers/fetchData';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';
import { classNames } from '@utils/class-names';

const AdminWallet = ({ transactions, tableRef }: { transactions: any, tableRef:any }) => {
  const { user } = useAppSelector(selectAuth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [temp, setTemp] = useState(transactions);
  const getDate = () => {
    let nextMonth = moment().add(1, 'month').format('01/MM/YYYY');

    setDate(nextMonth.toString());
  };

  const getTotalBalance = (warehouseId: any) => {
    if (user !== null) {
      fetch(endPoints.reports.getTotal(warehouseId), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setTotalBalance(dat.content.balance);
          } else {
            setTotalBalance(0);
          }
        });
    }
  };

  const getTotalPaid = (warehouseId: any) => {
    if (user !== null) {
      fetch(endPoints.reports.getTotalPaid(warehouseId), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setTotalPaid(dat.content.balance);
          } else {
            setTotalPaid(0);
          }
        });
    }
  };

  const getWarehouses = () => {
    const endpoint = '/warehouse/warehouses';
    fetchData({ endpoint })
      .then((data) => {
        if (data.content) {
          setWarehouses(data.content);
          setTemp(data.content);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setTemp(transactions);
  }, [transactions]);

  const filter = (e: any) => {
    setTemp(transactions);
    let val = e.target.value.toString().toLowerCase();
    let count = 6;
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
              className="py-4 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Almacén
            </th>
            <th
              scope="col"
              className=" text-left  text-sm font-semibold text-gray-900"
            >
              Enviados
            </th>
            <th
              scope="col"
              className="text-left text-sm font-semibold text-gray-900"
            >
              Retornados
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Total Enviados
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Total Retornados
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Ha pagado
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Debe
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {temp &&
            temp.map((c: any, index: any) => (
              <>
                {(c.sends > 0 || c.returned > 0 || c.delivered > 0) && (
                  <tr key={index} className="bg-white">
                    {' '}
                    <td className="whitespace-nowrap py-4 px-2 pr-3 text-sm font-normal  text-gray-600">
                      {c.name}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      {c.sends}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      {c.returned}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      Q {parseFloat(c.totalAmountSend).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      Q {parseFloat(c.totalAmountReturned).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      Q {parseFloat(c.totalPaid).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      Q {parseFloat(c.pendingDebt).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      {c.pendingDebt > 0 ? (
                        <span className="bg-red-50 text-red-700 p-1 rounded-md">
                          INSOLVENTE
                        </span>
                      ) : (
                        <span className="bg-green-50 text-green-700 p-1 rounded-md">
                          SOLVENTE
                        </span>
                      )}
                    </td>
                  </tr>
                )}
              </>
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
              className="py-4 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Almacén
            </th>
            <th
              scope="col"
              className=" text-left  text-sm font-semibold text-gray-900"
            >
              Enviados
            </th>
            <th
              scope="col"
              className="text-left text-sm font-semibold text-gray-900"
            >
              Retornados
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Total Enviados
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Total Retornados
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Ha pagado
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Debe
            </th>
            <th
              scope="col"
              className=" text-left text-sm font-semibold text-gray-900"
            >
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {temp &&
            temp.map((c: any, index: any) => (
              <>
                {(c.sends > 0 || c.returned > 0 || c.delivered > 0) && (
                  <tr key={index} className="bg-white">
                    {' '}
                    <td className="whitespace-nowrap py-4 px-2 pr-3 text-sm font-normal  text-gray-600">
                      {c.name}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      {c.sends}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      {c.returned}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      Q {parseFloat(c.totalAmountSend).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      Q {parseFloat(c.totalAmountReturned).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      Q {parseFloat(c.totalPaid).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      Q {parseFloat(c.pendingDebt).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                      {c.pendingDebt > 0 ? (
                        <span className="bg-red-50 text-red-700 p-1 rounded-md">
                          INSOLVENTE
                        </span>
                      ) : (
                        <span className="bg-green-50 text-green-700 p-1 rounded-md">
                          SOLVENTE
                        </span>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminWallet;
