import { CartList } from '@components/ecommerce/cart/cart-list';
import { CartWrapper } from '@components/ecommerce/cart/cart-wrapper';
import { OrderSummary } from '@components/ecommerce/cart/order-summary';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectCart } from '@redux/states/cartSlice';
import { selectCoupun } from '@redux/states/Coupun';
import { orderCompleted } from '@redux/states/Orders';
import { selectOrders } from '@redux/states/Orders/orderSlice';
import { CreateOrder } from 'interfaces/IOrder';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart, shoppingAddress } = useAppSelector(selectCart);
  const { warehousesId, success, isLoading, sellerId, message, error, orderId, token } =
    useAppSelector(selectOrders);
  const {
    coupon: { couponId },
  } = useAppSelector(selectCoupun);

  const orderDetail = cart.map(({ id, quantity }) => ({
    productId: id,
    quantity,
  }));

  const handleOrderComplete = async () => {
    const body: CreateOrder = {
      name: shoppingAddress?.name!,
      surnames: shoppingAddress?.surnames!,
      cellPhone: shoppingAddress?.cellPhone!,
      email: shoppingAddress?.email!,
      shippingAddress: shoppingAddress?.shippingAddress!,
      cityId: Number(shoppingAddress?.citiesId),
      sellerId: sellerId ? sellerId : '',
      couponId: couponId ? couponId : '',
      observation: shoppingAddress?.observation ? shoppingAddress?.observation : '',
      orderDetail,
    };
    dispatch(orderCompleted(body));
  };

  useEffect(() => {
    if (!shoppingAddress) {
      router.push('/checkout/address');
    }
  }, [router]);

  useEffect(() => {
    if (success) {
      router.replace(`/orders/${orderId}`);
    }
  }, [success]);

  if (!shoppingAddress) {
    return <></>;
  }

  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | Summary"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      <CartWrapper titlePrincipal="Resumen de la Order">
        <CartList />
        <OrderSummary
          titleButton={'Realizar Pedido'}
          onClick={handleOrderComplete}
          showAddresses
          isLoading={isLoading}
          isCupon={warehousesId ? true : false}
          errorMessage={message}
          isSummary
        />
      </CartWrapper>
    </LayoutShopSimple>
  );
};

export default CheckoutPage;
