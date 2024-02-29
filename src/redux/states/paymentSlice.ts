import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import endPoints from "@services/api";
import { fetchData } from "helpers/fetchData";
import { useDispatch } from "react-redux";
import { actions } from "react-table";
import { AppState } from "redux/app/store";
import { sendData } from "../../helpers/sendData";

export interface PaymentState {
  image: {
    key: "",
    fileLoading:any,
    load: boolean,
  }
}

const initialState: PaymentState = {
  image: {
    key: "",
    fileLoading: "",
    load: false,
  },
};

//create slice for products
export const paymentSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addImages: (state:any, action:any) => {
      state.image = action.payload;
    },
  },
});

export const {
  addImages,
} = paymentSlice.actions;

export default paymentSlice.reducer;
