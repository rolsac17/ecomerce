import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { AuthComponent } from '@components/ecommerce/auth';
import { useRouter } from 'next/router';
import { CartList } from '@components/ecommerce/cart/cart-list';
import { OrderSummary } from '@components/ecommerce/cart/order-summary';
import { CartWrapper } from '@components/ecommerce/cart/cart-wrapper';
import { useEffect } from 'react';
import { selectAuth, setShowModal } from '@redux/states/Auth';
import { getCart, selectCart } from '@redux/states/cartSlice';
import NoShoppingCart from '@components/ecommerce/cart/no-shopping-cart';

const CartPage = () => {
  const router = useRouter();
  const dispath = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectAuth);
  const { cart } = useAppSelector(selectCart);

  const handleCheckout = () => {
    // isLoggedIn ? router.push('/checkout/address') : dispath(setShowModal(true));
    router.push('/checkout/address');
  };

  useEffect(() => {
    dispath(getCart());
  }, []);

  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | Cart"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      {cart.length < 1 ? (
        <NoShoppingCart />
      ) : (
        <CartWrapper titlePrincipal="Carrito" goToStore>
          <CartList editable />
          <OrderSummary
            titleButton={'Tramitar Pedido'}
            onClick={handleCheckout}
          />
        </CartWrapper>
      )}

      <AuthComponent />
    </LayoutShopSimple>
  );
};

export default CartPage;
