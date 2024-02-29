import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartSlice from '@redux/states/cartSlice';
import authSlice from '@redux/states/Auth/authSlice';
import {
  filterProductSlice,
  incomeSlice,
  paymentSlice,
  subcategoriesSlicer,
  uiSlicer,
} from 'redux/states';
import orderSlice from '@redux/states/Orders/orderSlice';
import couponSlice from '@redux/states/Coupun/couponSlice';
import utilsSlice from '@redux/states/Utils/utilsSlice';
import wishListSlice from '@redux/states/Wishlist/wishlistSlice';
import profileSlice from '@redux/states/Profile/profileSlice';

export function makeStor() {
  return configureStore({
    reducer: {
      filterProducts: filterProductSlice,
      subcategory: subcategoriesSlicer,
      ui: uiSlicer,
      cart: cartSlice,
      auth: authSlice,
      payment: paymentSlice,
      orders: orderSlice,
      income: incomeSlice,
      coupon: couponSlice,
      utils: utilsSlice,
      wishlist: wishListSlice,
      profile: profileSlice,
    },
  });
}

const store = makeStor();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatcher = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
