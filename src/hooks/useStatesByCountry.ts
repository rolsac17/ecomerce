import useSWR, { SWRConfiguration } from 'swr';

export const useStatesByCountry = (
  endPointUrl: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR(endPointUrl, config);
  return {
    states: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};
