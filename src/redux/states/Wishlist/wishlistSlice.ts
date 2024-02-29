import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishList } from 'interfaces';
import { AppState } from 'redux/app/store';

export enum MethodWishlist {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  SHARE = 'share',
}

export interface IActionsWishlist {
  loading: boolean;
  error: boolean;
  message: string;
  isMethod?: MethodWishlist;
  wishlist?: WishList;
  success: boolean;
}

const initialState: IActionsWishlist = {
  loading: false,
  error: false,
  message: '',
  success: false
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setMethod: (state, action: PayloadAction<MethodWishlist>) => {
      state.isMethod = action.payload;
    },
    updateWishlist: (state, action: PayloadAction<WishList>) => {
      state.wishlist = action.payload;
    },
    deleteWishlist: (state, action: PayloadAction<WishList>) => {
      state.wishlist = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    selectedWishlist: (state, action: PayloadAction<WishList>) => {
      state.wishlist = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setMessage,
  setMethod,
  updateWishlist,
  deleteWishlist,
  setSuccess,
  selectedWishlist
} = wishlistSlice.actions;

export const selectWishlist = (state: AppState) => state.wishlist;
export default wishlistSlice.reducer;
