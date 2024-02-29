import Cookie from 'js-cookie';
import useSWR, { SWRConfiguration } from 'swr';
import getSessionStorage from 'utils/get-session-storage';

export const useOrders = (
  endPointUrl: string,
  token: string,  
  config: SWRConfiguration = {}
) => {

  const fetcher = (url: string, token: string) => fetch(url, { headers: { Authorization: "Bearer " + token }}).then((res) => res.json()).then((dat) => dat);
  const { data, error } = useSWR(token ? [endPointUrl, token] : null, fetcher);

  return {
    orders: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};