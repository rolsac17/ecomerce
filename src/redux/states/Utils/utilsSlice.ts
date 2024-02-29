import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/app/store';

export interface IOrderState {
  modal: boolean;
}

const initialState: IOrderState = {
 modal: false,
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
   showModal: (state) => {
    state.modal = true;
   },
   closeModal: (state) => {
    state.modal = false;
   },
  },
});

export const {
  showModal, closeModal
} = utilsSlice.actions;

export const selectUtils = (state: AppState) => state.utils;
export default utilsSlice.reducer;
