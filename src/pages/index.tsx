import { GetServerSideProps } from 'next';
import { Products } from '@components/ecommerce';
import { LayoutShop } from 'layouts/LayoutShop';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { TrendingProducts } from '@components/ecommerce/trending-products';
import { useProducts } from '@hooks/useProducts';
import endPoints from '@services/api';
import { isOffer } from '@utils/product-offer';
import { getAllProductsId } from '@utils/products';
import { setSellerId, setWarehouseId } from '@redux/states/Orders/orderSlice';
import { selectFilterProducts } from '@redux/states/filterProductsSlice';

interface Props {
  sellerId?: string;
  warehousesId?: string;
}

const HomePage: React.FC<Props> = ({ sellerId, warehousesId }) => {
  const dispatch = useAppDispatch();

  const { products, isLoading } = useProducts(
    { limit: 24 },
    endPoints.products.getInitialProdutcs
  );

  const { categoryId } = useAppSelector(selectFilterProducts);

  const productsOffer = isOffer(products);

  useEffect(() => {
    if (sellerId !== null) {
      dispatch(setSellerId(sellerId!));
    }
    if (warehousesId !== null) {
      dispatch(setWarehouseId(warehousesId!));
    }
  }, []);

  return (
    <LayoutShop
      title="La tienda oficial Weexa | Shop"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      {productsOffer.length > 0 &&
        !sellerId &&
        !warehousesId &&
        categoryId === '' && (
          <TrendingProducts trendingProducts={productsOffer} />
        )}
      <Products />
    </LayoutShop>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sellerId = ctx.query['sellerId'];
  const warehousesId = ctx.query['warehousesId'];

  return {
    props: {
      sellerId: sellerId ? sellerId : null,
      warehousesId: warehousesId ? warehousesId : null,
    },
  };
};
