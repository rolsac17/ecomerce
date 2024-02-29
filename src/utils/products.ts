import endPoints from '@services/api';
import axios from 'axios';
import { IProductIDResponse } from 'interfaces/IProductByID';
import { IProductsResponse } from 'interfaces/IProducts';

const getAllProductsId = async () => {
  const { data } = await axios.get<IProductsResponse>(
    endPoints.products.getInitialProdutcs
  );

  return {
    productIDs: data.content.map(({ id }) => String(id)),
  };
};

const getProductById = async (id: string) => {
  try {
    const { data } = await axios.get<IProductIDResponse>(
      endPoints.products.getProductById(id)
    );

    const { content } = data;

    return content;
    
  } catch (error) {
    return null;
  }
};

export { getAllProductsId, getProductById };
