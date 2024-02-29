import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import endPoints from "@services/api";
import { fetchData } from "helpers/fetchData";
import { useDispatch } from "react-redux";
import { AppState } from "redux/app/store";
import { sendData } from "../../helpers/sendData";

export interface SubCategoryState {
  list: [];
  active: {};
}

const initialState: SubCategoryState = {
  list: [],
  active: {},
};


//create slice for products
export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    setSubCategories: (state:any, action:any) => {
      state.list = action.payload;
    },
    addSubCategory: (state:any, action:any) => {
      const category = action.payload;
      state.list.push(category);
    },
    activeSubCategory: (state:any, action:any) => {
      const scategory = action.payload;
      state.active = scategory;
    },
  },
});

export const { addSubCategory, activeSubCategory, setSubCategories } =
  subcategorySlice.actions;

//execute method for add a new income
export function saveSubCategory(values:any) {
  return async function saveSubcategory(dispatch:any) {
    dispatch(addSubCategory(values));
  };
}

export const fetchSubCategories = (subcategories:any) => {
  return async function fetchSubCategories(dispatch:any){
    dispatch(setSubCategories(subcategories))
  }
};

// export const uploadLogo = (formData) => {
//   return (state: AppState) => {
//     const endpoint = '/warehouse/products'

//     sendData({ method: 'POST', endpoint, body: formData })
//       .then((data) => {})
//       .catch((err) => {
//         console.error(err)
//       })
//   }
// }

export default subcategorySlice.reducer;
