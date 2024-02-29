import { AppThunk } from '@redux/app/store';
import endPoints from '@services/api';
import axios from 'axios';
import { CouponResponse } from 'interfaces/ICoupon';
import { selectAuth } from '../Auth';
import {
  resetCoupon,
  setCoupon,
  setError,
  setLoading,
  setMessage,
  setSuccess,
} from './couponSlice';

interface ProductQty {
  id: number;
  quantity: number;
}

export const isValidCoupon =
  (coupon: string, warehousesId: string, products: ProductQty[]): AppThunk =>
  async (dispatch, getState) => {
    const {
      user: { token },
    } = selectAuth(getState());

    const body = {
      code: coupon,
      warehousesId,
      products,
    };

    try {
      dispatch(setLoading(true));
      dispatch(setSuccess(false));

      const { data } = await axios.post(endPoints.coupons.validate, body);

      dispatch(setCoupon(data.content));
      dispatch(setLoading(false));
      dispatch(setError(false));
      dispatch(setSuccess(true));
      dispatch(setMessage('El cupón fue aplicado con éxito'));

      setTimeout(() => {
        dispatch(setSuccess(false));
        dispatch(setMessage(''));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data.message === 'error: invalid coupon'
            ? 'El cupón no es valido'
            : error.response?.data.message;
        dispatch(resetCoupon());
        dispatch(setError(true));
        dispatch(setMessage(message));

        setTimeout(() => {
          dispatch(setError(false));
          dispatch(setMessage(''));
        }, 3000);
        return;
      }
      dispatch(resetCoupon());
      dispatch(setError(true));
      dispatch(setMessage('Error no encontrado, hable con el administrador'));
      setTimeout(() => {
        dispatch(setError(false));
        dispatch(setMessage(''));
      }, 3000);
    }
  };
