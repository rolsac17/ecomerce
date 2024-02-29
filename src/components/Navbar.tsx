import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react';

import { MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { getCart, selectCart } from '@redux/states/cartSlice';
import Link from 'next/link';
import { classNames } from '@utils/class-names';
import { logout, selectAuth } from '@redux/states/Auth';
import Image from 'next/image';
import ico from '/public/images/ico.png';
import {
  MenuAlt2Icon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const userNavigation = [
  { name: 'Iniciar sesión', href: '/auth/login' },
  { name: 'Registrarse', href: '/auth/register' },
];
const Navbar = ({ setSidebarOpen }: { setSidebarOpen: any }) => {
  const { currentUser, isLoggedIn } = useAppSelector(selectAuth);
  const { user } = useAppSelector(selectAuth);
  const router = useRouter();
  const nameUser = `${currentUser?.name} ${currentUser.surnames}`;
  const userData = {
    name: nameUser && nameUser,
    email: currentUser?.email && currentUser.email,
    imageUrl: nameUser && `https://ui-avatars.com/api/?name=${nameUser}`,
  };
  const dispatch = useAppDispatch();
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex"></div>
        <div className="lg:ml-4">
          <div className="flex items-center">
            {/* <button
                    type="button"
                    className="bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 my-3 relative flex-shrink-0">
              <div>
                <Menu.Button className="bg-gray-600 shadow-sm rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-600 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  {currentUser.name === '' ? (
                    <UserCircleIcon className="h-10 w-10" aria-hidden="true" />
                  ) : (
                    <Image
                      height={'40'}
                      width={'40'}
                      className="rounded-full h-10 w-10"
                      src={ico}
                      alt={'User Avatar'}
                    />
                  )}
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-white  focus:outline-none">
                  {!isLoggedIn ? (
                    userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link href={item.href}>
                            <a
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block py-2 px-4 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    ))
                  ) : (
                    <>
                      {user.type !== 'ADMINISTRATOR' && (
                        <Menu.Item>
                          <button
                            onClick={() => router.push('../')}
                            className="block py-2 px-4 text-sm text-gray-700"
                          >
                            Ir a la tienda
                          </button>
                        </Menu.Item>
                      )}

                      {user.type !== 'ADMINISTRATOR' && (
                        <Menu.Item>
                          <Link href="/contact" passHref>
                            <button className="block py-2 px-4 text-sm text-gray-700">
                              Contacta con Weexa
                            </button>
                          </Link>
                        </Menu.Item>
                      )}

                      <Menu.Item>
                        <button
                          onClick={() => dispatch(logout())}
                          className="block py-2 px-4 text-sm text-gray-700"
                        >
                          Cerrar sesión
                        </button>
                      </Menu.Item>
                    </>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
