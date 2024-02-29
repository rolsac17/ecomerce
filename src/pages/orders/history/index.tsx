import React from 'react';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import {
  CardOrder,
  Container,
  HeadOrder,
  NoResult,
  SearchOrder,
} from '@components/ecommerce/orders';
import { useAppSelector } from '@redux/app/hooks';
import { LoadingOrder } from '@components/ecommerce/loading/loading-order';
import { selectOrders } from '@redux/states/Orders/orderSlice';

const HistoryPage = () => {
  const { isLoading, error, message, orderPublic } =
    useAppSelector(selectOrders);

  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | Orders"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      <Container>
        <HeadOrder />
        <SearchOrder />
        {isLoading && <LoadingOrder />}
        {Object.entries(orderPublic).length !== 0 && (
          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>
            <CardOrder orderPublic={orderPublic} />
          </div>
        )}
        {error && <NoResult message={message} />}
      </Container>
    </LayoutShopSimple>
  );
};

export default HistoryPage;
