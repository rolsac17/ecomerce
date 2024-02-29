import { useProducts } from '@hooks/useProducts';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import {
  selectFilterProducts,
  setProductsBySubCategory,
  cleanProductsBySubCategory,
} from '@redux/states/filterProductsSlice';
import { selectOrders } from '@redux/states/Orders/orderSlice';
import endPoints from '@services/api';
import { classNames } from '@utils/class-names';
import { IProduct } from 'interfaces/IProducts';
import { useEffect, useState } from 'react';
import { CardProducts } from './card-products';
import { GridProducts } from './grid-products';
import { SkeletonProducts } from './skeleton-products';

interface Props {
  productsBySubCategory?: IProduct[];
  titleProducts?: string;
  isSimilarProduct?: boolean;
  offer?: boolean;
}

export const Products: React.FC<Props> = ({
  productsBySubCategory,
  titleProducts,
  isSimilarProduct,
  offer,
}) => {
  const { categoryId, subcategoryId } = useAppSelector(selectFilterProducts);
  const { warehousesId } = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  const [isOffer, setIsOffer] = useState<string>('');
  const PAGE_LIMIT = 24;
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const { products, isLoading } = useProducts(
    { limit, categoryId, subcategoryId, warehousesId, isOffer },
    endPoints.products.getInitialProdutcs
  );

  const showProducts = productsBySubCategory ? productsBySubCategory : products;

  useEffect(() => {
    products.length > 0 && dispatch(setProductsBySubCategory(products));

    return () => {
      dispatch(cleanProductsBySubCategory());
    };
  }, [products.length > 0]);

  useEffect(() => {
    setLimit(PAGE_LIMIT);
  }, [categoryId, subcategoryId]);

  useEffect(() => {
    if (offer) {
      setIsOffer('true');
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 bg-white">
      {titleProducts && (
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-6 -mt-10">
          {titleProducts}
        </h2>
      )}
      {isLoading ? (
        <SkeletonProducts />
      ) : (
        <>
          <GridProducts>
            {showProducts.map((product: IProduct) => (
              <CardProducts key={product.id} product={product} />
            ))}
          </GridProducts>
          <div
            className={classNames(
              showProducts.length < limit ? 'hidden' : 'flex',
              'w-full py-8 justify-center'
            )}
          >
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setLimit((prev) => prev + PAGE_LIMIT);
              }}
              className="w-48 flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Ver mas
            </button>
          </div>
        </>
      )}
      {!isLoading && showProducts.length < 1 && (
        <h1 className="text-center text-lg text-gray-300">
          No se Encontraron productos...
        </h1>
      )}
    </div>
  );
};
