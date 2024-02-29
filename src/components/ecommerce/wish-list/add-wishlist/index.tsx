import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { classNames } from '@utils/class-names';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { useWishList } from '@hooks/useWishList';
import endPoints from '@services/api';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { WishList } from 'interfaces';
import { showModal } from '@redux/states/Utils';
import { addDetailWishlist } from '@redux/states/Wishlist';
import {
  selectedWishlist,
  selectWishlist,
  setSuccess,
} from '@redux/states/Wishlist/wishlistSlice';

export interface Props {
  productId: number;
}

export const AddWishlist: React.FC<Props> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const { success } = useAppSelector(selectWishlist);
  const {
    user: { token },
  } = useAppSelector(selectAuth);
  const { wishList } = useWishList(endPoints.wishList.getAll, token);
  const [selected, setSelected] = useState<WishList>();

  useEffect(() => {
    if (wishList) {
      setSelected(wishList[0]);
    }
  }, [wishList]);

  const addWishList = (wishListId: number) => {
    dispatch(addDetailWishlist(wishListId, productId));
  };

  useEffect(() => {
    if (success) {
      dispatch(selectedWishlist(selected!));
    }
  }, [success]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            {' '}
            Change published status{' '}
          </Listbox.Label>
          <div className="relative">
            <div className="flex w-full divide-x divide-yellow-600 rounded-md shadow-sm">
              <div className="flex w-full divide-x divide-yellow-600 rounded-md shadow-sm">
                <div
                  onClick={() => addWishList(selected?.id!)}
                  className="cursor-pointer flex w-11/12 items-center rounded-l-md border border-transparent bg-yellow-500 py-2 pl-3 pr-4 text-white shadow-sm"
                >
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium truncate whitespace-nowrap text-ellipsis">
                    Agregar a la Lista {selected?.name!}
                  </p>
                </div>
                <Listbox.Button className="flex min-w-12 items-center rounded-l-none rounded-r-md bg-yellow-500 p-2 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  <span className="sr-only">Change published status</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {wishList.map((option: WishList) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-yellow-500' : 'text-gray-900',
                        'cursor-default select-none p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div
                        onClick={() => addWishList(option.id)}
                        className="flex flex-col"
                      >
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {option.name}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? 'text-white' : 'text-yellow-500'
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
