import type { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MailOpenIcon,
  MenuAlt1Icon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import useOptions from '@hooks/useOptions';
import { SearchIcon } from '@heroicons/react/solid';
import Sidebar from '@components/Sidebar';
import endPoints from '@services/api';
import AuhtLayout from 'layouts/AuhtLayout';
import AdminLayout from 'layouts/AdminLayout';
import {
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import StackedAreaChart from './components/StackedAreaChart';
import PieChart from './components/PieChart';
import { classNames } from '@utils/class-names';
import getSessionStorage from '@utils/get-session-storage';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';

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
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
];
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
};

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
const Dashboard: NextPage = () => {
  const { user } = useAppSelector(selectAuth);
  const [token, setToken] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [delivered, setDelivered] = useState(0);
  const [returned, setReturned] = useState(0);
  const [sends, setSends] = useState(0);

  const stats = [
    {
      id: 1,
      name: 'Total Enviados',
      stat: sends,
      icon: MailOpenIcon,
    },
    {
      id: 2,
      name: 'Total Retornados',
      stat: returned,
      icon: CursorClickIcon,
    },
  ];

  const getDelivered = () => {
    if (user !== null) {
      fetch(endPoints.dashboard.delivered, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            let { delivered } = dat.content;

            setDelivered(delivered);
          }
        });
    }
  };

  const getReturned = () => {
    if (user !== null) {
      fetch(endPoints.dashboard.returned, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            let { returned } = dat.content;

            setReturned(returned);
          }
        });
    }
  };

  const getSends = () => {
    if (user !== null) {
      fetch(endPoints.dashboard.sends, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            let { sends } = dat.content;

            setSends(sends);
          }
        });
    }
  };

  useEffect(() => {
    getReturned();
    getSends();
  }, []);

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="min-h-full">
        {/* Static sidebar for desktop */}

        <main className="flex-1 pb-8">
          {/* Page header */}

          <div className="mt-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Dashboard
                </h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                  {stats.map((item) => (
                    <div
                      key={item.id}
                      className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-xl shadow-gray-200 rounded-xl overflow-hidden"
                    >
                      <dt>
                        <div className="absolute bg-cblue-500 rounded-md p-3">
                          <item.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                          {item.name}
                        </p>
                      </dt>
                      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-bold text-gray-900">
                          {item.stat}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Activity list (smallest breakpoint only) */}

            {/* Activity table (small breakpoint and up) */}
            <div className="">
              <div className="max-w-6xl p-4  grid-cols-2 mt-4 mx-auto sm:px-6 lg:px-8">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Pedidos del Mes
                </h3>
                <div className="p-4 my-4 bg-white rounded-xl shadow-xl shadow-gray-200">
                  <StackedAreaChart />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
