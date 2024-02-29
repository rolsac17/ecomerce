import useSWR, { SWRConfiguration } from 'swr';

export interface Params {
  limit?: number;
  categoryId?: string;
  subcategoryId?: string;
  searchField?: string;
  warehousesId?: string;
  isOffer?: string;
}

export const useProducts = (
  params: Params,
  endPointUrl: string,
  config: SWRConfiguration = {}
) => {
  const { limit = '', categoryId = '', subcategoryId ='', searchField = '', warehousesId = '', isOffer = '' } = params;
  const { data, error } = useSWR(
    `${endPointUrl}?limit=${limit}&categoryId=${categoryId}&subcategoryId=${subcategoryId}&searchField=${searchField}&warehousesId=${warehousesId}&isOffer=${isOffer}`,
    config
  );

  if(data?.message.toLowerCase() === 'error: product not found'){
    return {
      products: data?.content || [],
      isLoading: false,
      isError: error
    }
  }

  return {
    products: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};
