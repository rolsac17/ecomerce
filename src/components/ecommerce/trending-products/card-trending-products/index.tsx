import { useAppDispatch } from '@redux/app/hooks';
import { setProduct } from '@redux/states/filterProductsSlice';
import endPoints from '@services/api';
import { format } from '@utils/currency';
import { IProduct } from 'interfaces/IProducts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface Props {
  product: IProduct;
}
export const CardTrendingProduct: React.FC<Props> = ({ product }) => {
  const [isImageLoad, setIsImageLoad] = useState(false);
  console.log(isImageLoad);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getPrincipalImage = product?.images?.filter(
    ({ principal }) => principal === true
  );

  const handlerProductDetail = (product: IProduct) => {
    router.push(`/product/${product.id}`);
    dispatch(setProduct(product));
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => handlerProductDetail(product)}
    >
      <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
        {getPrincipalImage?.map(({ id, key }) => (
          <Image
            key={id}
            src={`${endPoints.files.download}/${key}`}
            alt={product.name}
            layout="responsive"
            height={'100%'}
            width={'100%'}
            loading="lazy"
            onLoad={() => setIsImageLoad(true)}
          />
        ))}
      </div>
      {isImageLoad && (
        <div className="mt-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800 mb-2">
            {product.offer}% Off
          </span>
          <div className="flex justify-center space-x-2">
            <p className="text-sm font-normal text-gray-500 line-through">
              {format(product.previousPrice)}
            </p>
            <p className="text-sm font-normal text-gray-500">
              {' '}
              {format(product.price)}
            </p>
          </div>
          <h3 className="mt-1 font-semibold text-gray-900">
            <span className="absolute inset-0" />
            {product.name}
          </h3>
        </div>
      )}
    </div>
  );
};
