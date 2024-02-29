import { WishList } from '@components/ecommerce/wish-list';
import { useAppDispatch } from '@redux/app/hooks';
import { showModal } from '@redux/states/Utils';
import {
  MethodWishlist,
  setMethod,
} from '@redux/states/Wishlist/wishlistSlice';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';

const WishListPage = () => {
  const dispatch = useAppDispatch();

  const createList = () => {
    dispatch(showModal());
    dispatch(setMethod(MethodWishlist.CREATE));
  };

  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | WishList"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      <div className="mx-auto max-w-7xl px-4 sm:p-6 lg:p-8">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Tus Listas
                </h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  onClick={() => createList()}
                  type="button"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-greenBlue focus:ring-offset-2"
                >
                  Crear una lista
                </button>
              </div>
            </div>
          </div>
          <WishList />
        </div>
      </div>
    </LayoutShopSimple>
  );
};

export default WishListPage;
