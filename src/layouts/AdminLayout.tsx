import React, { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import useOptions from '@hooks/useOptions';
import {
  ChevronDownIcon,
  MenuAlt1Icon,
  SearchIcon,
} from '@heroicons/react/solid';
import Sidebar from '@components/Sidebar';
import endPoints from '@services/api';
import Navbar from '@components/Navbar';
import Head from 'next/head';
import ico from '/public/images/ico.png';
import { AnimatePresence, motion } from 'framer-motion';
import SolvencyNotification from '@common/components/SolvencyNotification';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { useRouter } from 'next/router';
import DynamicHeroIcon from '@common/DynamicIcons';
import { useTotalOrders } from '@hooks/useTotalOrders';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

const AdminLayout: FC<Props> = ({
  children,
  pageDescription,
  title,
  imageFullUrl,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }
  const { user } = useAppSelector(selectAuth);
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [navigation, setNavigation] = useState<any[]>([]);
  const { total, isLoading } = useTotalOrders(
    endPoints.dashboard.orders,
    user.token
  );

  const getOptions = () => {
    if (user !== null) {
      fetch(endPoints.options, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            let nav: any[] = [];
            dat.content.forEach((d: any) => {
              nav.push({
                name: d.description,
                href: d.route,
                icon: d.icon.trim(),
              });
            });

            setNavigation(nav);
          }
        });
    }
  };

  const getDelivered = () => {
    if (user !== null) {
      fetch(endPoints.dashboard.orders, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            let { total } = dat.content;

            // setTotal(total);
          }
        });
    }
  };

  useEffect(() => {
    getDelivered();
    getOptions();
  }, []);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cblue-50">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="">
                    <h1
                      onClick={() => router.push('../admin')}
                      className="text-3xl text-center cursor-pointer font-extrabold tracking-tight text-white"
                    >
                      WEEXA
                    </h1>
                  </div>
                  <nav
                    className=" flex-shrink-0 h-full divide-y divide-cblue-50 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="px-2 space-y-1"></div>
                    <div className="mt-6 pt-6">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) =>
                          !item.children ? (
                            <div key={item.name}>
                              <a
                                onClick={() => router.push(item.href)}
                                className="bg-cblue-50 cursor-pointer text-white hover:bg-cblue-500 hover:text-white group w-full  flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                              >
                                <DynamicHeroIcon
                                  icon={item.icon}
                                  aria-hidden="true"
                                />
                                {item.name}
                                {item.name === 'Pedidos' && total > 0 && (
                                  <span className="flex-shrink-0 text-xs bg-cblue-100 rounded-full mx-1 text-white px-1  font-extrabold leading-5">
                                    + {total}
                                  </span>
                                )}
                                {/* <svg
                            className={classNames(
                              'text-gray-300',
                              'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                            )}
                            viewBox='0 0 20 20'
                            aria-hidden='true'
                          >
                            <path d='M6 6L14 10L6 14V6Z' fill='currentColor' />
                          </svg> */}
                              </a>
                            </div>
                          ) : (
                            <Disclosure
                              as="div"
                              key={item.name}
                              className="space-y-1"
                            >
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    className={classNames(
                                      item.current
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                      'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
                                    )}
                                  >
                                    <DynamicHeroIcon
                                      icon={item.icon}
                                      aria-hidden="true"
                                    />
                                    <span className="flex-1">{item.name}</span>
                                    <svg
                                      className={classNames(
                                        open
                                          ? 'text-gray-400 rotate-90'
                                          : 'text-gray-300',
                                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                      )}
                                      viewBox="0 0 20 20"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M6 6L14 10L6 14V6Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="space-y-1">
                                    {item.children.map((subItem: any) => (
                                      <Disclosure.Button
                                        key={subItem.name}
                                        as="a"
                                        onClick={() =>
                                          router.push(subItem.href)
                                        }
                                        className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                      >
                                        {subItem.name}
                                      </Disclosure.Button>
                                    ))}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          )
                        )}
                      </div>
                    </div>
                  </nav>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow shadow-xl  bg-cblue-50  pt-5 pb-4 overflow-y-auto">
            <div className="">
              <h1
                onClick={() => router.push('../admin')}
                className="text-3xl cursor-pointer text-center font-extrabold tracking-tight text-white"
              >
                WEEXA
              </h1>
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {/* navigation */}
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <a
                        onClick={() => router.push(item.href)}
                        className="bg-cblue-50 cursor-pointer  text-white hover:bg-cblue-500 hover:text-white group w-full  flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <DynamicHeroIcon icon={item.icon} aria-hidden="true" />
                        {item.name}

                        {item.name === 'Pedidos' && total > 0 && (
                          <span className="flex-shrink-0 text-xs bg-cblue-100 rounded-full mx-1 text-white px-1  font-extrabold leading-5">
                            + {total}
                          </span>
                        )}
                        {/* <svg
                            className={classNames(
                              'text-gray-300',
                              'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                            )}
                            viewBox='0 0 20 20'
                            aria-hidden='true'
                          >
                            <path d='M6 6L14 10L6 14V6Z' fill='currentColor' />
                          </svg> */}
                      </a>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
                            )}
                          >
                            <DynamicHeroIcon
                              icon={item.icon}
                              aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                            <svg
                              className={classNames(
                                open
                                  ? 'text-gray-400 rotate-90'
                                  : 'text-gray-300',
                                'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6L14 10L6 14V6Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem: any) => (
                              <Disclosure.Button
                                key={subItem.name}
                                as="a"
                                onClick={() => router.push(subItem.href)}
                                className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1"></div>
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 md:pl-0 sm:pl-0 flex flex-col flex-1 bg-gray-50 h-screen z-0">
          <Navbar setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 pb-8">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="overflow-y-auto"
              >
                <div className="py-1 z-10">{children}</div>
              </motion.div>
            </AnimatePresence>
          </main>
          <SolvencyNotification />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
