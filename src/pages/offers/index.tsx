import { Products } from '@components/ecommerce';
import { LayoutShop } from 'layouts/LayoutShop';
import React from 'react';

const OffersPage = () => {
  return (
    <LayoutShop
      title="La tienda oficial Weexa | Offers"
      pageDescription="La tienda oficial de Weexa. Descubre las mejores ofertar en miles de productos. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      <Products offer titleProducts="Ofertas Flash" />
    </LayoutShop>
  );
};

export default OffersPage;
