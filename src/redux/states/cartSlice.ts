import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct, IShoppingAddress } from 'interfaces/ICart';
import Cookies from 'js-cookie';
import { AppState, AppThunk } from 'redux/app/store';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  shippingCost: number;
  shoppingAddress?: IShoppingAddress | null;
  total: number;
}

const initialState: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  shippingCost: 0,
  shoppingAddress: null,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICartProduct>) => {
      const productInCart = state.cart.some((p) => p.id === action.payload.id);

      const updatedProducts = state.cart.map((p) => {
        if (p.id !== action.payload.id) return p;
        // Actualizar la cantidad
        p.quantity += action.payload.quantity;
        return p;
      });
      if (!productInCart) {
        state.cart = [...state.cart, action.payload];
      } else {
        state.cart = updatedProducts;
      }

      Cookies.set('cart', JSON.stringify(state.cart));
    },
    removeProductToCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      Cookies.set('cart', JSON.stringify(state.cart));
    },
    updateCartQuantity: (state, action: PayloadAction<ICartProduct>) => {
      state.cart = state.cart.map((p) => {
        if (p.id !== action.payload.id) {
          return p;
        }
        return action.payload;
      });
      Cookies.set('cart', JSON.stringify(state.cart));
    },
    orderSumary: (state) => {
      (state.numberOfItems = state.cart.reduce(
        (prev, current) => current.quantity + prev,
        0
      )),
        (state.subTotal = state.cart.reduce(
          (prev, current) => current.quantity * current.price + prev,
          0
        )),
        (state.shippingCost = state.cart.reduce(
          (prev, current) => current.quantity * current.costOfShopping + prev,
          0
        ));
      state.total = state.shippingCost + state.subTotal;
    },
    setShoppingAddress: (state, action: PayloadAction<IShoppingAddress>) => {
      state.shoppingAddress = action.payload;
    },
    orderCompleted: (state) => {
      (state.cart = []), (state.subTotal = 0), (state.numberOfItems = 0);
    },
    setCart: (state, action: PayloadAction<ICartProduct[]>) => {
      state.cart = action.payload;
    },
  },
});

export const {
  addProductToCart,
  removeProductToCart,
  updateCartQuantity,
  orderSumary,
  orderCompleted,
  setShoppingAddress,
  setCart,
} = cartSlice.actions;

export const selectCart = (state: AppState) => state.cart;

export const getCart = (): AppThunk => (dispatch) => {
  const cookiesProducts = Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart')!)
    : [];
  dispatch(setCart(cookiesProducts));
  dispatch(orderSumary());
};
export default cartSlice.reducer;
