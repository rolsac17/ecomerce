import React, { FC } from 'react';
import { Disclosure } from '@headlessui/react';
import { Dialog, Menu, Transition } from '@headlessui/react';
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
import * as HIcons from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import endPoints from '@services/api';
import DynamicHeroIcon from '@common/DynamicIcons';
import { useRouter } from 'next/router';
import getSessionStorage from 'utils/get-session-storage';
import { classNames } from '@utils/class-names';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { ChevronDownIcon, MenuAlt1Icon, SearchIcon } from '@heroicons/react/solid';

const Sidebar = ({
  setSidebarOpen,
  sidebarOpen,
  Fragment,
}: {
  setSidebarOpen: any;
  sidebarOpen: any;
  Fragment: any;
}) => {
  const { user } = useAppSelector(selectAuth);
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [navigation, setNavigation] = useState<any[]>([]);
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

  useEffect(() => {
    getOptions();
  }, []);

  return (
    
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
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
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                {/* LOGO */}
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) =>
                    !item.children ? (
                      <div key={item.name}>
                        <a
                          href="#"
                          className="bg-white  text-gray-700 hover:bg-gray-50 hover:text-gray-900 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <DynamicHeroIcon
                            icon={item.icon}
                            aria-hidden="true"
                          />
                          {item.name}

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
                            <Disclosure.Button className="bg-white  text-gray-600 hover:bg-gray-50 hover:text-gray-900 group w-full flex items-center pl-2 pr-1 py-2 text-left text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
          <div className="px-3">
            <p className="text-center font-bold text-2xl text-cblue-500">
              WEEXA
            </p>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav
              className="flex-1 px-2 space-y-1 bg-white"
              aria-label="Sidebar"
            >
              {navigation.map((item) =>
                !item.children ? (
                  <div key={item.name}>
                    <a
                      onClick={() => router.push(item.href)}
                      className="bg-white  text-cblue-600 hover:bg-gray-50 hover:text-cblue-500 group w-full  flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <DynamicHeroIcon icon={item.icon} aria-hidden="true" />
                      {item.name}

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
                            'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
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
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
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
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
