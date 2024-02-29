import React, { useEffect } from 'react';
import { useWishList } from '@hooks/useWishList';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';
import { HeadWishList } from '../head-wish-list';
import { ProductCardWishList } from '../product-card-wish-list';
import { ProductGridCard } from '../product-grid-card';
import { DividerListBottom } from '../divider-list-bottom';
import { WishList } from 'interfaces/IWishList';
import { EmojiSadIcon, EyeOffIcon } from '@heroicons/react/outline';
import { selectWishlist } from '@redux/states/Wishlist/wishlistSlice';

export const ListingWishList = () => {
  const {
    user: { token },
  } = useAppSelector(selectAuth);
  const { success, error } = useAppSelector(selectWishlist);
  const { wishList, mutate } = useWishList(endPoints.wishList.getAll, token);

  useEffect(() => {
    if (success) {
      mutate(endPoints.wishList.getAll);
    }
  }, [success])
  

  return (
    <>
      {wishList.length === 0 ? (
        <div className="flex items-center justify-center py-4">
          <EyeOffIcon className="h-8 w-8 text-gray-500 mr-4" />
          <h1 className="text-xl text-gray-500">
            No hay lista de deseos para mostrar. <br /> Crea una y añade
            artículos que te gustaría mostrar
          </h1>
        </div>
      ) : (
        wishList?.map(({ id, name, created_at, event, detail }: WishList) => (
          <div key={id} className="px-2">
            <HeadWishList wishlist={{ id, name, created_at, event, detail }} />
            {detail === null ? (
              <div className="flex items-center justify-center py-4">
                <EmojiSadIcon className="h-8 w-8 text-gray-500 mr-4" />
                <h1 className="text-xl text-gray-500">
                  No hay articulos en esta Lista. <br /> Añade artículos que te
                  gustaría comprar
                </h1>
              </div>
            ) : (
              <ProductGridCard>
                {detail?.map((product) => (
                  <ProductCardWishList
                    key={product.id}
                    wishlistId={id}
                    product={product}
                    isEditable
                  />
                ))}
              </ProductGridCard>
            )}
            <DividerListBottom description="Final de la lista" />
          </div>
        ))
      )}
    </>
  );
};
