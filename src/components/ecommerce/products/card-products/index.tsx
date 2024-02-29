import { useAppDispatch } from '@redux/app/hooks';
import { setProduct } from '@redux/states/filterProductsSlice';
import endPoints from '@services/api';
import { format } from '@utils/currency';
import { IProduct } from 'interfaces/IProducts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

// export interface ProductsResponse {}
interface Props {
  product: IProduct;
}
export const CardProducts: FC<Props> = ({ product }) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const [isImageLoad, setIsImageLoad] = useState(false);

  const handlerProductDetail = (product: IProduct) => {
    push(`/product/${product.id}`);
    dispatch(setProduct(product));
  };

  const getPrincipalImage = product?.images?.filter(
    ({ principal }) => principal === true
  );

  return (
    <div
      onClick={() => handlerProductDetail(product)}
      className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden fadeIn cursor-pointer"
    >
      <div className="h-48 bg-gray-50 group-hover:opacity-75 sm:aspect-none sm:h-96">
        <div className="bg-gray-50  h-full w-full relative">
          {getPrincipalImage?.map(({ id, key }) => (
            <Image
              key={id}
              src={`${endPoints.files.download}/${key}`}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              loading="lazy"
              onLoad={() => setIsImageLoad(true)}
            />
          ))}
        </div>
      </div>
      {isImageLoad && (
        <div className="flex-1 p-2 md:p-4 flex flex-col fadeIn">
          <h3 className="text-sm font-medium text-gray-700 truncate whitespace-nowrap text-ellipsis mb-1">
            {product.name}
          </h3>
          <p className="text-base font-medium text-gray-900">
            {format(product.price)}
          </p>
          {product.isOffer && (
            <div className="flex space-x-2">
              <p className="text-sm font-normal text-gray-500 line-through">
                {format(product.previousPrice)}
              </p>
              <p className="text-sm font-normal text-gray-500">
                {product.offer}%
              </p>
            </div>
          )}
          <div className="flex-1 flex flex-col justify-end mt-2">
            {product.inventary ? (
              <p className="text-sm italic text-gray-500">
                disponibles {product.stock}
              </p>
            ) : (
              <p className="text-sm italic text-gray-500">
                {product.status === 'AVAILABLE'
                  ? 'disponible'
                  : 'no disponible'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
