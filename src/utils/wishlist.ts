import endPoints from '@services/api';
import axios from 'axios';
import { ResponseWishList } from 'interfaces/IWishList';

const getWishlistById = async (id: string) => {
  try {
    const { data } = await axios.get<ResponseWishList>(
      endPoints.wishList.getByID(id)
    );

    const { content } = data;

    return content;
  } catch (error) {
    return null;
  }
};

export { getWishlistById };
