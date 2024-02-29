import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from 'interfaces/ICoupon';
import { AppState } from 'redux/app/store';

export interface IOrderState {
  isLoading: boolean;
  message: string;
  error: boolean;
  success: boolean;
  coupon: Coupon;
}

const initialState: IOrderState = {
  isLoading: false,
  message: '',
  error: false,
  success: false,
  coupon: {} as Coupon,
};

export const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
    },
    resetCoupon: (state) => {
      state.coupon = {} as Coupon;
      state.isLoading = false;
      state.success = false;
      state.error = false;
    },
  },
});

export const { setLoading, setMessage, setError, setCoupon, setSuccess, resetCoupon } = couponSlice.actions;

export const selectCoupun = (state: AppState) => state.coupon;
export default couponSlice.reducer;
