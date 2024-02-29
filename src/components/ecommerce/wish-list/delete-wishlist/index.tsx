import { ExclamationIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { closeModal } from '@redux/states/Utils';
import { deleteWishlist } from '@redux/states/Wishlist';
import { selectWishlist } from '@redux/states/Wishlist/wishlistSlice';
import React, { useEffect } from 'react';

export const DeleteWishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist, loading, error, success } = useAppSelector(selectWishlist);

  const deleteById = () => {
    dispatch(deleteWishlist(wishlist?.id!));
  };

  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Confirmar la eliminación
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Estas seguro de que quieres eliminar esta lista?
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          disabled={loading}
          onClick={() => deleteById()}
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-greenBlue focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Sí
        </button>
        <button
          onClick={() => dispatch(closeModal())}
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancelar
        </button>
      </div>
    </>
  );
};
