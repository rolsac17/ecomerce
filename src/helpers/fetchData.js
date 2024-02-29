import axios from 'axios';
import { getErrorMessage } from './errors';

export const fetchData = ({ endpoint }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const user = JSON.parse(window.sessionStorage.getItem('auth'));

      if (!user) {
        reject('Acceso Denegado');
      }

      const TOKEN = user.token;
      const url = `${API_URL}${endpoint}`;

      const { data } = await axios({
        method: 'GET',
        url,
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
    }
  });
};
