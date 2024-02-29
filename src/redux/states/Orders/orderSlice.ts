import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPublicOrder } from 'interfaces/IPublicOrder';
import { AppState } from 'redux/app/store';

export interface IOrderState {
  isLoading: boolean;
  success: boolean;
  error: boolean;
  message: string;
  sellerId?: string;
  warehousesId?: string;
  token: string;
  orderId: string;
  orderPublic: IPublicOrder
}

const initialState: IOrderState = {
  isLoading: false,
  success: false,
  error: false,
  message: '',
  token: '',
  orderId: '',
  orderPublic: {} as IPublicOrder
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setSellerId: (state, action: PayloadAction<string>) => {
      state.sellerId = action.payload;
    },
    setWarehouseId: (state, action: PayloadAction<string>) => {
      state.warehousesId = action.payload;
    },
    setOrderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetOrderCompleted: (state) => {
      state.error = false;
      state.isLoading = false;
      state.success = false;
      state.sellerId = '';
    },
    setOrderPublic: (state, action: PayloadAction<IPublicOrder>) => {
      state.orderPublic = action.payload;
    },
  },
});

export const {
  setLoading,
  setSuccess,
  setError,
  setMessage,
  setSellerId,
  setWarehouseId,
  setOrderId,
  setToken,
  resetOrderCompleted,
  setOrderPublic
} = orderSlice.actions;

export const selectOrders = (state: AppState) => state.orders;
export default orderSlice.reducer;
