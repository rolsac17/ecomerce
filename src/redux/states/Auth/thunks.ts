import { AppThunk } from '@redux/app/store';
import endPoints from '@services/api';
import setSessionsStorage from '@utils/set-session-storage';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  setCurrentUser,
  setError,
  setLoading,
  setSuccess,
  setUser,
  setMessage,
} from './authSlice';

export const logIn =
  (email: string, password: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      const { data } = await axios.post(endPoints.login.singin, {
        email,
        password,
      });

      if (data.content.token) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.content.token}`;
        try {
          const { data } = await axios.get(endPoints.users.currentUser);
          Cookies.set('currentUser', JSON.stringify(data.content));
          dispatch(setCurrentUser(data.content));
        } catch (error: any) {
          console.error(error);
        }
      }

      setSessionsStorage('auth', data.content);
      Cookies.set('token', JSON.stringify(data.content.token));
      dispatch(setUser(data.content));
      dispatch(setSuccess());
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(true));
      dispatch(setLoading(false));
      dispatch(setMessage(error.response.data.message));
      setTimeout(() => dispatch(setError(false)), 7000);
    }
  };
