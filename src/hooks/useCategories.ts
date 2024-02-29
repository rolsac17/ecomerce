import useSWR, { SWRConfiguration } from 'swr';

export const useCategories = (
  endPointUrl: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR(endPointUrl, config);
  return {
    categories: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};