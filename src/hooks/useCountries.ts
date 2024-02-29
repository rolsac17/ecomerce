import endPoints from '@services/api';
import useSWR, { SWRConfiguration } from 'swr';

export const useCountries = (
  endPointUrl: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR(endPointUrl, config);
  return {
    countries: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};
