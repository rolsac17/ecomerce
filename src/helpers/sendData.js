import axios from 'axios';
import { getErrorMessage } from './errors';
import NProgress from 'nprogress';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';

export const sendData = ({ method, endpoint, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      NProgress.start();
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const user = JSON.parse(window.sessionStorage.getItem('auth'));

      if (!user) {
        reject('Acceso Denegado');
      }

      const TOKEN = user.token;

      const { data } = await axios({
        method,
        url: `${API_URL}${endpoint}`,
        data: body,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (data) {
        resolve(data);
      } else {
        reject('!! Algo salio mal ha ocurrido un error');
      }
    } catch (err) {
      reject(getErrorMessage(err));
    } finally {
      NProgress.done();
    }
  });
};
