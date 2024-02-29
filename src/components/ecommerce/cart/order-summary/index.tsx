import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectCart } from '@redux/states/cartSlice';
import { selectCoupun } from '@redux/states/Coupun';
import { classNames } from '@utils/class-names';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { format } from 'utils/currency';
import { Cupon } from '../cupon';
// import Dynamic components
const DynamicCardAddress = dynamic(
  () => import('@components/ecommerce/card-address')
);

interface Props {
  hiddenButton?: boolean;
  titleButton: string;
  onClick: () => void;
  isCupon?: boolean;
  disabled?: boolean;
  showAddresses?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  isSummary?: boolean;
}

export const OrderSummary: React.FC<Props> = ({
  titleButton,
  onClick,
  isCupon,
  disabled,
  hiddenButton,
  showAddresses,
  isLoading,
  errorMessage,
  isSummary,
}) => {
  const { subTotal, numberOfItems, shippingCost, total } =
    useAppSelector(selectCart);
  const { coupon } = useAppSelector(selectCoupun);

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Orden
      </h2>
      {showAddresses && <DynamicCardAddress />}
      {isCupon && <Cupon />}
      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">
            {coupon.subTotal ? format(coupon.subTotal) : format(subTotal)}
          </dd>
        </div>
        <div
          className={classNames(
            coupon.discount ? 'flex' : 'hidden',
            'items-center justify-between'
          )}
        >
          <dt className="text-sm text-gray-600">Promoción aplicada</dt>
          <dd className="text-sm font-medium text-red-600">
            - {format(coupon.discount)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">No. Productos</dt>
          <dd className="text-sm font-medium text-gray-900">
            {numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Costo de envió</dt>
          <dd className="text-sm font-medium text-gray-900">
            {format(shippingCost)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Tipo de pago</dt>
          <dd className="text-sm font-medium text-gray-900">
            Pago contra entrega
          </dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="text-base font-medium text-gray-900">Total Orden</dt>
          <dd className="text-base font-medium text-gray-900">
            {coupon.total ? format(coupon.total) : format(total)}
          </dd>
        </div>
        {isSummary && (
          <div className="pt-4">
            <Link href="/terms" passHref>
              <a target="_blank" className="text-sm text-gray-600">
                Al completar la compra, aceptas estas &nbsp;
                <span className="text-blue">Condiciones de uso.</span>
              </a>
            </Link>
          </div>
        )}
      </dl>
      {errorMessage && (
        <div className="rounded-md bg-red-50 mt-4 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {errorMessage}
              </h3>
            </div>
          </div>
        </div>
      )}
      <div className={`${hiddenButton ? 'hidden' : 'visible mt-6'}`}>
        <button
          disabled={disabled || isLoading}
          onClick={() => onClick()}
          type="button"
          className="w-full bg-blue border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue"
        >
          {isLoading ? 'Processing...' : `${titleButton}`}
        </button>
      </div>
    </section>
  );
};
