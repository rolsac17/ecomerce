import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import endPoints from "@services/api";
import { fetchData } from "helpers/fetchData";
import { useDispatch } from "react-redux";
import { actions } from "react-table";
import { AppState } from "redux/app/store";
import { sendData } from "../../helpers/sendData";

export interface IncomeState {
  income: [];
  images: [];
  active: {};
  product: {};
  labels: [];
}

const initialState: IncomeState = {
  income: [],
  images: [],
  active: {},
  product: {},
  labels: [],
};

//create slice for products
export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    currentIncome: (state:any, action:any) => {
      state.active = action.payload;
    },
    addImages: (state:any, action:any) => {
      state.images.push(action.payload);
    },
    updateImage: (state:any, action:any) => {
      const currentImage = state.images
        ? state.images.findIndex((i:any) => i.load === true)
        : -1;

      if (currentImage >= 0) {
        state.images[currentImage] = action.payload;
      }
    },
    deleteImage: (state:any, action:any) => {
      const current = state.images[action.payload];

      if (current.principal) {
        state.images.splice(action.payload, 1);
        if (state.images.length > 0) state.images[0].principal = true;
      } else {
        state.images.splice(action.payload, 1);
      }
    },
    setAsMain: (state:any, action:any) => {
      const previous = state.images.findIndex((i:any) => i.principal === true);

      state.images[previous].principal = false;

      state.images[action.payload].principal = true;
    },
    activeProduct: (state, action) => {
      state.product = action.payload;
      state.images = action.payload.images;
      state.labels = action.payload.details;
    },
    deleteLabel: (state:any, action:any) => {
      state.labels.splice(action.payload, 1);
    },
    addLabels: (state:any, action:any) => {
      state.labels.push(action.payload);
    },
  },
});

export const {
  currentIncome,
  addImages,
  deleteImage,
  setAsMain,
  activeProduct,
  updateImage,
  deleteLabel,
  addLabels,
} = incomeSlice.actions;

export default incomeSlice.reducer;
