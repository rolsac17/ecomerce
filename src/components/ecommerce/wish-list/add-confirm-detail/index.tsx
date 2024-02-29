import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { closeModal } from '@redux/states/Utils';
import { selectWishlist } from '@redux/states/Wishlist/wishlistSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface Props {
  name: string;
  description: string;
  url: string;
}

export const AddConfirmDetail: React.FC<Props> = ({
  name,
  description,
  url,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { wishlist } = useAppSelector(selectWishlist);

  const nextShop = () => {
    dispatch(closeModal());
    router.push('/wishlist');
  };
  return (
    <>
      <h4 className="font-medium text-gray-900">
        <span>1 articulo agregado a {wishlist?.name!}</span>
      </h4>
      <div className="mt-10 border-t border-gray-200">
        <h2 className="sr-only">Your order</h2>
        <h3 className="sr-only">Items</h3>
        <div className="flex space-x-6 border-b border-gray-200 py-10">
          <img
            src={url}
            alt={description}
            className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
          />
          <div className="flex flex-auto flex-col">
            <div>
              <h4 className="font-medium text-gray-900">
                <span>{name}</span>
              </h4>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-betwee space-x-2">
        <button
          onClick={() => nextShop()}
          type="button"
          className="w-full flex justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Ver tu lista
        </button>

        <button
          onClick={() => dispatch(closeModal())}
          type="button"
          className="w-full flex justify-center items-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-greenBlue focus:ring-offset-2"
        >
          Continuar comprando
        </button>
      </div>
    </>
  );
};
