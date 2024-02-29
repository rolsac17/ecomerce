import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import { GetServerSideProps, NextPage } from 'next';

import { useEffect, useState } from 'react';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectFilterProducts } from '@redux/states/filterProductsSlice';
import endPoints from '@services/api';
import { ItemCounter } from '@components/ecommerce/item-counter';
import { ICartProduct } from 'interfaces/ICart';
import { useRouter } from 'next/router';
import { addProductToCart, selectCart } from '@redux/states/cartSlice';
import { Products } from '@components/ecommerce';
import { format } from 'utils/currency';
import { classNames } from '@utils/class-names';
import { getAllProductsId, getProductById } from '@utils/products';
import { IProductByID } from 'interfaces/IProductByID';
import { setSellerId, setWarehouseId } from '@redux/states/Orders/orderSlice';
import { AddWishlist } from '@components/ecommerce/wish-list/add-wishlist';
import { selectAuth } from '@redux/states/Auth';
import { ModalWishList } from '@components/ecommerce/wish-list/modal-wish-list';
import { AddConfirmDetail } from '@components/ecommerce/wish-list/add-confirm-detail';
import Image from 'next/image';

export interface Props {
  product: IProductByID;
  sellerId?: string;
  warehousesId?: string;
}

const ProductPage: NextPage<Props> = ({ product, sellerId, warehousesId }) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { productsBySubCategory } = useAppSelector(selectFilterProducts);
  const { isLoggedIn } = useAppSelector(selectAuth);
  const imgPrincipal = product?.images && product.images[0].key;

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    id: product.id,
    name: product.name,
    internalId: product.internalId,
    description: product.description,
    price: product.price,
    images: imgPrincipal || '',
    quantity: 1,
    costOfShopping: product.costOfShopping,
    inventory: product.inventory,
    stock: product.stock,
    isOffer: product.isOffer,
    previousPrice: product.previousPrice,
    offer: product.offer,
  });

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    dispatch(addProductToCart(tempCartProduct));
    push('/cart');
  };

  useEffect(() => {
    if (sellerId !== null) {
      dispatch(setSellerId(sellerId!));
    }
    if (warehousesId !== null) {
      dispatch(setWarehouseId(warehousesId!));
    }
  }, []);

  return (
    <LayoutShopSimple
      title={tempCartProduct.name}
      pageDescription={tempCartProduct.description}
      imageFullUrl={`${endPoints.files.download}/${tempCartProduct.images}`}
    >
      <div className="bg-white ">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.images?.map((image) => (
                    <Tab
                      key={image.key}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.key}</span>
                          <span className="absolute inset-0 rounded-md overflow-hidden">
                            <Image
                              src={`${endPoints.files.download}/${image.key}`}
                              alt={product.name}
                              layout="fill"
                              objectFit="contain"
                              className="w-full h-full object-center object-cover"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-blue-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                {product.images?.map((image) => (
                  <Tab.Panel key={image.key}>
                    <Image
                      src={`${endPoints.files.download}/${image.key}`}
                      alt={product.name}
                      className="w-full h-full object-center object-cover sm:rounded-lg"
                      height={500}
                      width={500}
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>

                <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                  <p className="text-gray-900 text-3xl">
                    {format(product.price)}
                  </p>
                  {product.isOffer && (
                    <div className="flex space-x-2">
                      <p className="text-sm font-normal text-gray-500 line-through">
                        {format(product.previousPrice)}
                      </p>
                      <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                        {product.offer}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
              <div className="mt-4">
                {product.isAvailable && (
                  <ItemCounter
                    currentValue={tempCartProduct.quantity}
                    updatedQuantity={onUpdateQuantity}
                    maxValue={product.inventory ? product.stock : 10000}
                  />
                )}
              </div>

              <div className="mt-10 flex flex-col">
                <span
                  className={classNames(
                    product.isAvailable ? 'hidden' : 'block',
                    'text-sm text-gray-500 mb-2'
                  )}
                >
                  No disponible
                </span>
                <button
                  disabled={product?.isAvailable ? false : true}
                  onClick={() => onAddProduct()}
                  type="button"
                  className={classNames(
                    product.isAvailable
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed opacity-50',
                    'bg-blue max-w-xs flex-1 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 sm:w-full'
                  )}
                >
                  Añadir al carrito
                </button>
                {isLoggedIn && (
                  <div className="mt-5 pt-5 max-w-xs flex-1 border-t sm:w-full">
                    <AddWishlist productId={product.id} />
                  </div>
                )}
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Envió:
                  <span className="ml-2 prose prose-sm mt-4 text-gray-500">
                    {format(product.costOfShopping)}
                  </span>
                </h2>
                <h2 className="text-sm font-medium text-gray-900">
                  Tipo de pago:
                  <span className="ml-2 prose prose-sm mt-4 text-gray-500">
                    Pago contra entrega
                  </span>
                </h2>
              </div>
              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>
                <div className="border-t divide-y divide-gray-200">
                  {product?.details?.map((detail) => (
                    <Disclosure as="div" key={detail.label} defaultOpen>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? 'text-blue-600' : 'text-gray-900',
                                  'text-sm font-medium'
                                )}
                              >
                                {detail.label}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-blue-400 group-hover:text-blue-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <ul role="list">
                              {/* {product?.detail?.map((item) => ( */}
                              <li>{detail.value}</li>
                              {/* ))} */}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
        <Products
          productsBySubCategory={productsBySubCategory}
          titleProducts={'Productos Similares'}
          isSimilarProduct
        />
      </div>
      <ModalWishList>
        <AddConfirmDetail
          url={`${endPoints.files.download}/${tempCartProduct.images}`}
          name={product.name}
          description={product.description}
        />
      </ModalWishList>
    </LayoutShopSimple>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const { id } = params as { id: string };
  const { sellerId, warehousesId } = query as {
    sellerId: string;
    warehousesId: string;
  };

  const product = await getProductById(id);
  const productAvailable = {
    ...product,
    isAvailable:
      product?.inventory && product.stock > 0 && product.status === 'AVAILABLE'
        ? true
        : product?.inventory === false && product.status === 'AVAILABLE'
        ? true
        : false,
  };

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: productAvailable,
      sellerId: sellerId ? sellerId : null,
      warehousesId: warehousesId ? warehousesId : null,
    },
  };
};

export default ProductPage;
