import { AppThunk } from '@redux/app/store';
import endPoints from '@services/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { selectAuth, setCurrentUser } from '../Auth';
import { setError, setLoading, setMessage, setSuccess } from './profileSlice';

export interface IProfile {
  userId?: string;
  email: string;
  dpi: string;
  name: string;
  surnames: string;
  birthDate?: string;
  cellPhone: string;
  phone?: string;
  address: string;
  citiesId: number;
}

export const updateProfile =
  (profile: IProfile): AppThunk =>
  async (dispatch, getState) => {
    const { user, currentUser } = selectAuth(getState());
    try {
      dispatch(setLoading(true));

      const {
        data: { content },
      } = await axios({
        method: 'PUT',
        url: endPoints.profile.update,
        data: profile,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      let profileResponse: IProfile = {
        ...content,
        referenceAddress: content.address,
      };

      dispatch(setSuccess(true));
      dispatch(setMessage('Actualización exitosa'));
      dispatch(setLoading(false));
      dispatch(setCurrentUser({ ...currentUser, ...profileResponse }));
      Cookies.set(
        'currentUser',
        JSON.stringify({ ...currentUser, ...profileResponse })
      );
      setTimeout(() => {
        dispatch(setSuccess(false));
        dispatch(setMessage(''));
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(true));
        dispatch(setLoading(false));
        dispatch(
          setMessage('Algo salio mal, no se pudo actualizar tu información')
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
