import useSWR, { SWRConfiguration } from 'swr';


export const useTotalOrders = (
  endPointUrl: string,
  token: string,  
  config: SWRConfiguration = {}
) => {

  const fetcher = (url: string, token: string) => fetch(url, { headers: { Authorization: "Bearer " + token }}).then((res) => res.json()).then((dat) => dat);
  const { data, error } = useSWR(token ? [endPointUrl, token] : null, fetcher);


  return {
    total: data?.content.total || 0,
    isLoading: !error && !data?.content,
    isError: error,
  };
};
