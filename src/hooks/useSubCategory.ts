import { isOffer } from '@utils/product-offer';
import useSWR, { SWRConfiguration } from 'swr';

export const useSubCategory = (
  idCategory: string,
  endPointUrl: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR(
    idCategory && idCategory !== '' ? endPointUrl : null,
    config
  );

  if (idCategory === '') {
    return {
      subCategory: [],
      isLoading: false,
      isError: error,
    };
  }
  if (data?.message.toLowerCase() == 'error: subcategories not found') {
    return {
      products: data?.content || [],
      isLoading: false,
      isError: error,
    };
  }

  return {
    subCategory: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};
