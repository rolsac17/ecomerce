import { useAppSelector } from '@redux/app/hooks';
import {
  MethodWishlist,
  selectWishlist,
} from '@redux/states/Wishlist/wishlistSlice';
import React from 'react';
import { DeleteWishlist } from './delete-wishlist';
import { FormWishList } from './form-wish-list';
import { ListingWishList } from './listing-wish-list';
import { ModalWishList } from './modal-wish-list';
import { ShareButton } from './share-button';

export const WishList = () => {
  const { isMethod } = useAppSelector(selectWishlist);
  let modalContent;

  switch (isMethod) {
    case MethodWishlist.DELETE:
      modalContent = <DeleteWishlist />;
      break;
    case (MethodWishlist.CREATE):
      modalContent = <FormWishList />;
      break;
    case (MethodWishlist.UPDATE):
      modalContent = <FormWishList />;
      break;
    case MethodWishlist.SHARE:
      modalContent = <ShareButton/>;
      break;
    default:
      modalContent = null;
      break;
  }
  return (
    <>
      <ListingWishList />
      <ModalWishList>{modalContent}</ModalWishList>
    </>
  );
};
