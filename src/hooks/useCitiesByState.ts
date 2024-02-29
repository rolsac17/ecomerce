import useSWR, { SWRConfiguration } from 'swr';

export const useCitiesByState = (
  idState: string,
  endPointUrl: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR(idState ? endPointUrl : null, config);
  return {
    cities: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};
