import React from 'react';
import { ProductWishList } from 'interfaces/IWishList';
import endPoints from '@services/api';
import Image from 'next/image';
import { format } from '@utils/currency';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/solid';
import { useAppDispatch } from '@redux/app/hooks';
import { deleteDetailWishlist } from '@redux/states/Wishlist';

export interface Props {
  isEditable?: boolean;
  product: ProductWishList;
  wishlistId: number;
}

export const ProductCardWishList: React.FC<Props> = ({
  product,
  wishlistId,
  isEditable,
}) => {
  const dispatch = useAppDispatch();
  const imgPrincipal = product?.images?.find(
    ({ principal }) => principal === true
  );

  const deleteProductDetialWishlist = (
    wishlistId: number,
    productId: number
  ) => {
    dispatch(deleteDetailWishlist(wishlistId, productId));
  };

  return (
    <div className="mb-6" key={product.id}>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <Image
            src={`${endPoints.files.download}/${imgPrincipal?.key}`}
            alt={product.description}
            layout="fill"
            objectFit="cover"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            {format(product.price)}
          </p>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <Link href={`/product/${product.id}`} passHref>
          <a className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">
            Comprar<span className="sr-only">, {product.name}</span>
          </a>
        </Link>
        {isEditable && (
          <button
            onClick={() => deleteProductDetialWishlist(wishlistId, product.id)}
            title="Borrar"
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
