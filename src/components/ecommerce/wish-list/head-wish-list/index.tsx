import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '@utils/class-names';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { ShareIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { showModal } from '@redux/states/Utils';

import { WishList } from 'interfaces';
import {
  deleteWishlist,
  MethodWishlist,
  selectedWishlist,
  setMethod,
  updateWishlist,
} from '@redux/states/Wishlist/wishlistSlice';

export interface Props {
  wishlist: WishList;
}

export const HeadWishList: React.FC<Props> = ({ wishlist }) => {
  const dispatch = useAppDispatch();

  const updateList = () => {
    dispatch(showModal());
    dispatch(setMethod(MethodWishlist.UPDATE));
    dispatch(updateWishlist(wishlist));
  };

  const deleteList = () => {
    dispatch(showModal());
    dispatch(setMethod(MethodWishlist.DELETE));
    dispatch(deleteWishlist(wishlist));
  };

  const shareButtonsWishlist = () => {
    dispatch(showModal());
    dispatch(setMethod(MethodWishlist.SHARE));
    dispatch(selectedWishlist(wishlist));
  };

  return (
    <div className="border-b border-gray-200 p-2">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <h1
            id="message-heading"
            className="text-lg font-medium text-gray-900"
          >
            {wishlist.name}
          </h1>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          <button
            onClick={() => shareButtonsWishlist()}
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ShareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Compartir lista
          </button>
          <Menu as="div" className="relative ml-3 inline-block text-left">
            <div>
              <Menu.Button className="-my-2 flex items-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-greenBlue">
                <span className="sr-only">Open options</span>
                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => updateList()}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'flex justify-between px-4 py-2 text-sm'
                        )}
                      >
                        <span>Modificar lista</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => deleteList()}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'flex justify-between px-4 py-2 text-sm'
                        )}
                      >
                        <span>Eliminar lista</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
