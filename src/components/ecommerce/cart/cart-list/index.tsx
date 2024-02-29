import { ItemCounter } from '@components/ecommerce/item-counter';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import {
  orderSumary,
  removeProductToCart,
  selectCart,
  updateCartQuantity,
} from '@redux/states/cartSlice';
import endPoints from '@services/api';
import { ICartProduct } from 'interfaces/ICart';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { format } from 'utils/currency';

interface Props {
  editable?: boolean;
  products?: ICartProduct[];
}
export const CartList: React.FC<Props> = ({ editable = false, products }) => {
  const dispath = useAppDispatch();
  const { cart } = useAppSelector(selectCart);

  const productsToShow = products ? products : cart;

  const onUpdateQuantity = (product: ICartProduct, quantity: number) => {
    const updateQuantity = {
      ...product,
      quantity,
    };
    dispath(updateCartQuantity(updateQuantity));
  };

  const onRemoveProductToCart = (id: number) => {
    dispath(removeProductToCart(id));
  };

  useEffect(() => {
    dispath(orderSumary());
  }, [cart]);

  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>

      <ul
        role="list"
        className="border-t border-b border-gray-200 divide-y divide-gray-200"
      >
        {productsToShow.map((product) => (
          <li key={product.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={`${endPoints.files.download}/${product.images}`}
                alt={product.name}
                height={`100%`}
                width={`100%`}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <div className="flex flex-col items-end">
                    <p>{format(product.price)}</p>
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
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {product.description}
                </p>
              </div>
              {editable && (
                <div className="my-2">
                  <ItemCounter
                    currentValue={product.quantity}
                    maxValue={product.inventory ? product.stock : 10000}
                    updatedQuantity={(value) =>
                      onUpdateQuantity(product, value)
                    }
                  />
                </div>
              )}
              <div className="flex flex-1 items-end justify-end text-sm">
                {editable ? (
                  <div className="flex">
                    <button
                      onClick={() => onRemoveProductToCart(product.id)}
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">cant. {product.quantity}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
