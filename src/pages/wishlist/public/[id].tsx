import React from 'react'
import { ProductCardWishList } from '@components/ecommerce/wish-list/product-card-wish-list';
import { ProductGridCard } from '@components/ecommerce/wish-list/product-grid-card';
import { EmojiSadIcon } from '@heroicons/react/solid';
import { getWishlistById } from '@utils/wishlist';
import { WishList } from 'interfaces'
import { LayoutShopSimple } from 'layouts/LayoutShopSimple'
import { GetServerSideProps } from 'next'

interface Props {
  wishlist: WishList;
}
const publicWishlistPage:React.FC<Props> = ({wishlist}) => {
  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | public Wishlist"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
    <div className="mx-auto max-w-7xl px-6 sm:p-6 lg:p-8">
      <div className='pt-4'>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900">
          {wishlist.name}
        </h1>
        {wishlist.detail === null ? (
          <div className="flex items-center justify-center py-4">
            <EmojiSadIcon className="h-8 w-8 text-gray-500 mr-4" />
            <h1 className="text-xl text-gray-500">
              No hay articulos en esta Lista
            </h1>
          </div>
          ) : (
          <ProductGridCard>
          {wishlist.detail?.map((product) => (
          <ProductCardWishList key={product.id} product={product} />
          ))}
          </ProductGridCard>
        )}
      </div>
    </div>
    </LayoutShopSimple>
  )
}

export default publicWishlistPage

export const getServerSideProps: GetServerSideProps = async ({
  params
}) => {
  const { id } = params as { id: string };

  const wishlist = await getWishlistById(id);

  if (!wishlist) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      wishlist,
    },
  };
};