import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from 'interfaces/IProducts';
import { AppState } from 'redux/app/store';

export interface filterProductState {
  categoryId: string;
  subcategoryId: string;
  product: IProduct;
  productsBySubCategory: IProduct[];
}

const initialState: filterProductState = {
  categoryId: '',
  subcategoryId: '',
  product: {} as IProduct,
  productsBySubCategory: [],
};

export const filterProductSlice = createSlice({
  name: 'filterProducts',
  initialState,
  reducers: {
    selectCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    selectSubCategoryId: (state, action: PayloadAction<string>) => {
      state.subcategoryId = action.payload;
    },
    setProduct: (state, action: PayloadAction<IProduct>) => {
      state.product = action.payload;
    },
    setProductsBySubCategory: (state, action: PayloadAction<IProduct[]>) => {
      state.productsBySubCategory = action.payload.slice(0, 8);
    },
    cleanProductsBySubCategory: (state) => {
      state.productsBySubCategory = [];
    },
  },
});

export const {
  selectCategoryId,
  selectSubCategoryId,
  setProduct,
  setProductsBySubCategory,
  cleanProductsBySubCategory,
} = filterProductSlice.actions;

export const selectFilterProducts = (state: AppState) => state.filterProducts;
export default filterProductSlice.reducer;
