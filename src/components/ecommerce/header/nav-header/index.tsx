import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react';
import { MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import SearchHeader from '../serach-header';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { getCart, selectCart } from '@redux/states/cartSlice';
import Link from 'next/link';
import { classNames } from '@utils/class-names';
import { logout, selectAuth } from '@redux/states/Auth';
import Image from 'next/image';
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import ToShare from '@common/ToShare';
import logo from '/public/images/logo.png';
import ico from '/public/images/ico.png';
const navigation = [
  { name: 'Lista de deseos', href: '/wishlist' },
  { name: 'Mis Pedidos', href: '/orders/history' },
];
const userNavigation = [
  { name: 'Iniciar sesión', href: '/auth/login' },
  { name: 'Registrarse', href: '/auth/register' },
  { name: 'Mis Pedidos', href: '/orders/history' },
];

const pages = [
  { name: 'Tienda', href: '/' },
  { name: 'Almacenes', href: '/warehouses' },
  { name: 'Vendedores', href: '/sellers' },
  { name: 'Nosotros', href: '/about' },
  { name: 'Contacto', href: '/contacus' },
];

export const NavHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { numberOfItems } = useAppSelector(selectCart);
  const { currentUser, isLoggedIn } = useAppSelector(selectAuth);
  const { user } = useAppSelector(selectAuth);

  const nameUser = `${currentUser?.name} ${currentUser.surnames}`;
  const userData = {
    name: nameUser && nameUser,
    email: currentUser?.email && currentUser.email,
    imageUrl: nameUser && ico,
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <Disclosure
      as="nav"
      className="bg-blue border-b border-blue-300 border-opacity-25 lg:border-none"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-blue-400 lg:border-opacity-25">
              <div className="flex items-center gap-2">
                {/* Mobile menu button */}
                <Disclosure.Button className="lg:hidden bg-blue p-2 rounded-md inline-flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>

                <div className="flex-shrink-0">
                  <Link href="/">
                    <a>
                      <Image
                        height="50"
                        width="200"
                        className="block h-8 w-8"
                        src={logo}
                        alt="Logo Weexa"
                      />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-end">
                <div className="full hidden gap-4 lg:flex">
                  {pages.map((page) => (
                    <Link key={page.href} href={page.href} passHref>
                      <a
                        className={classNames(
                          router.pathname === page.href
                            ? 'border border-gray-100 text-gray-100'
                            : 'text-gray-100',
                          'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                        )}
                      >
                        {page.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="hidden md:block">
                  <SearchHeader />
                </div>

                <ToShare />
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="/cart">
                    <a className="group -m-2 p-2 flex items-center">
                      <ShoppingCartIcon
                        className="flex-shrink-0 h-6 w-6 text-blue-200 group-hover:text-white"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-blue-200 group-hover:text-white">
                        {numberOfItems > 9 ? '+9' : numberOfItems}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block lg:ml-4">
                <div className="flex items-center">
                  {/* <button
                    type="button"
                    className="bg-blue-600 flex-shrink-0 rounded-full p-1 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-blue rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        {currentUser.name === '' ? (
                          <UserCircleIcon
                            className="h-10 w-10"
                            aria-hidden="true"
                          />
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                            <div className="px-4 mb-2 ml-0 border-b">
                              <div className="text-base font-medium text-gray-900">
                                {userData.name}
                              </div>
                              <div className="text-sm font-medium text-gray-400 truncate whitespace-nowrap text-ellipsis">
                                {userData.email}
                              </div>
                            </div>
                            <div className="px-2 pt-2 pb-3 space-y-1 border-b">
                              {isLoggedIn &&
                                navigation.map((item) => (
                                  <Link key={item.name} href={item.href}>
                                    <a
                                      className={classNames(
                                        'text-gray-900 hover:bg-gray-200 hover:bg-opacity-75',
                                        'block rounded-md py-2 px-3 text-base font-medium'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  </Link>
                                ))}
                            </div>

                            {user.type !== 'ADMINISTRATOR' && (
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href={'/admin'}>
                                    <a
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block py-2 px-4 text-sm text-gray-700'
                                      )}
                                    >
                                      Ir a la Administración
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            )}
                            <Menu.Item>
                              {({ active }) => (
                                <Link href={'/profile'}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-gray-700'
                                    )}
                                  >
                                    Ver mi perfil
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
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

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn &&
                navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        'text-white hover:bg-blue-500 hover:bg-opacity-75',
                        'block rounded-md py-2 px-3 text-base font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
            </div>
            <div className="pt-4 pb-3 border-t border-blue-500">
              <div className="px-5 flex items-center">
                <div className="flex-shrink-0">
                  {currentUser.name === '' ? (
                    <UserCircleIcon
                      className="h-10 w-10 text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <Image
                      height={'40'}
                      width={'40'}
                      className="rounded-full h-10 w-10"
                      src={userData?.imageUrl}
                      alt={'User Avatar'}
                    />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {userData.name}
                  </div>
                  <div className="text-sm font-medium text-blue-300">
                    {userData.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {!isLoggedIn ? (
                  userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-75"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))
                ) : (
                  <>
                    {user.type !== 'ADMINISTRATOR' && (
                      <Link href={'/admin'}>
                        <a
                          className={classNames(
                            'block py-2 px-3 text-sm text-white hover:bg-blue-500 hover:bg-opacity-75'
                          )}
                        >
                          Ir a la administración
                        </a>
                      </Link>
                    )}
                    <Link href={'/profile'}>
                      <a
                        className={classNames(
                          'block py-2 px-3 text-sm text-white hover:bg-blue-500 hover:bg-opacity-75'
                        )}
                      >
                        Ver mi perfil
                      </a>
                    </Link>

                    <button
                      onClick={() => dispatch(logout())}
                      className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-75"
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
