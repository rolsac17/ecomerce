import { AppThunk } from '@redux/app/store';
import endPoints from '@services/api';
import axios from 'axios';
import { CreateOrder } from 'interfaces/IOrder';
import Cookies from 'js-cookie';
import {
  resetOrderCompleted,
  setError,
  setLoading,
  setMessage,
  setOrderId,
  setOrderPublic,
  setSuccess,
  setToken,
} from './orderSlice';
import {
  orderCompleted as cleanOrderCompleted,
  selectCart,
} from '../cartSlice';
import { resetCoupon } from '../Coupun';
import { ICreateClient } from 'interfaces/IUser';
import { IPublicOrder, ResponsePublicOrder } from 'interfaces/IPublicOrder';

export const orderCompleted =
  (order: CreateOrder): AppThunk =>
  async (dispatch, getState) => {
    const { shoppingAddress } = selectCart(getState());

    try {
      dispatch(setLoading(true));

      const { data : {id} } = await axios({
        method: 'post',
        url: endPoints.orders.createOrder,
        data: order,
      });

      dispatch(setOrderId(id));
      dispatch(setSuccess(true));
      dispatch(setLoading(false));
      dispatch(cleanOrderCompleted());
      Cookies.remove('cart');
      dispatch(resetOrderCompleted());
      dispatch(resetCoupon());
      setTimeout(() => {
        dispatch(setSuccess(false));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(setMessage('Algo salio mal, no se pudo completar la orden'));
        setTimeout(() => {
          dispatch(setError(false));
          dispatch(setMessage(''));
        }, 3000);
      } else {
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(setMessage('Error no encontrado, hable con el administrador'));
        setTimeout(() => {
          dispatch(setError(false));
          dispatch(setMessage(''));
        }, 3000);
      }
    }
  };

export const searchOrderById =
  (orderId: string, email?: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      const { data, status } = await axios.get<ResponsePublicOrder>(
        endPoints.orders.public(orderId, email)
      );
      dispatch(setOrderPublic(data?.content!));
      dispatch(setSuccess(true));
      dispatch(setLoading(false));
      dispatch(setMessage('Orden encontrada exitosamente'));
      setTimeout(() => {
        dispatch(setSuccess(false));
        dispatch(setMessage(''));
        dispatch(setError(false));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setOrderPublic({} as IPublicOrder));
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(setMessage('No hemos encontrado ningúna orden'));
        setTimeout(() => {
          dispatch(setError(false));
          dispatch(setMessage(''));
        }, 3000);
      } else {
        dispatch(setOrderPublic({} as IPublicOrder));
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(setMessage('Error no encontrado, hable con el administrador'));
        setTimeout(() => {
          dispatch(setError(false));
          dispatch(setMessage(''));
        }, 3000);
      }
    }
  };
