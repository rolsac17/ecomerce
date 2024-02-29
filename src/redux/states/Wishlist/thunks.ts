import { AppThunk } from '@redux/app/store';
import endPoints from '@services/api';
import axios from 'axios';
import { postWishlist } from 'interfaces';
import { selectAuth } from '../Auth';
import { closeModal, showModal } from '../Utils';
import { setError, setLoading, setMessage, setSuccess } from './wishlistSlice';

export const createWishlist =
  ({ name, eventId }: postWishlist): AppThunk =>
  async (dispatch, getState) => {
    const { user } = selectAuth(getState());
    try {
      dispatch(setLoading(true));
      const data = await axios.post(
        endPoints.wishList.getAll,
        {
          name,
          eventId: Number(eventId),
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );

      dispatch(setLoading(false));
      dispatch(setSuccess(true));
      dispatch(setMessage('Lista de deseos creada exitosamente'));
      dispatch(closeModal());

      setTimeout(() => {
        dispatch(setSuccess(false));
        dispatch(setMessage(''));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(
          setMessage('Algo salio mal, no se pudo crear la lista de deseos')
        );
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

export const updateWishlist =
  ({ name, eventId, id }: postWishlist): AppThunk =>
  async (dispatch, getState) => {
    const { user } = selectAuth(getState());
    try {
      dispatch(setLoading(true));
      const data = await axios.put(
        `${endPoints.wishList.getAll}/${id}`,
        {
          name,
          eventId: Number(eventId),
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );

      dispatch(setLoading(false));
      dispatch(setSuccess(true));
      dispatch(setMessage('Lista de deseos modificada exitosamente'));
      dispatch(closeModal());

      setTimeout(() => {
        dispatch(setSuccess(false));
        dispatch(setMessage(''));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(
          setMessage('Algo salio mal, no se pudo modificar la lista de deseos')
        );
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

export const deleteWishlist =
  (id: number): AppThunk =>
  async (dispatch, getState) => {
    const { user } = selectAuth(getState());
    try {
      dispatch(setLoading(true));
      const data = await axios.delete(`${endPoints.wishList.getAll}/${id}`, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      });

      dispatch(setLoading(false));
      dispatch(setSuccess(true));
      dispatch(setMessage('Lista de deseos eliminada exitosamente'));
      dispatch(closeModal());

      setTimeout(() => {
        dispatch(setSuccess(false));
        dispatch(setMessage(''));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(
          setMessage('Algo salio mal, no se pudo eliminar la lista de deseos')
        );
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

export const addDetailWishlist =
  (wishListId: number, productId: number): AppThunk =>
  async (dispatch, getState) => {
    const { user } = selectAuth(getState());
    try {
      dispatch(setLoading(true));
      const data = await axios.post(
        endPoints.wishList.addDetailWishlist,
        {
          wishListId,
          productId,
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );

      dispatch(setLoading(false));
      dispatch(setSuccess(true));
      dispatch(setMessage('Producto agregado exitosamente'));
      dispatch(showModal());

      setTimeout(() => {
        dispatch(setSuccess(false));
        dispatch(setMessage(''));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(setMessage('Algo salio mal, no se pudo agregar el producto'));
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

export const deleteDetailWishlist =
  (wishListId: number, productId: number): AppThunk =>
  async (dispatch, getState) => {
    const { user } = selectAuth(getState());
    try {
      dispatch(setLoading(true));
      const data = await axios.delete(
        endPoints.wishList.deleteDetailWishlist(wishListId, productId),
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );

      dispatch(setLoading(false));
      dispatch(setSuccess(true));
      dispatch(setMessage('Producto eliminado exitosamente'));

      setTimeout(() => {
        dispatch(setSuccess(false));
        dispatch(setMessage(''));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(setMessage('Algo salio mal, no se pudo agregar el producto'));
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
