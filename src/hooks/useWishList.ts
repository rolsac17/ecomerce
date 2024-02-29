import useSWR, { SWRConfiguration } from 'swr';
import { string } from 'yup';

export const useWishList = (
  endPointUrl?: string,
  token?: string,
  config: SWRConfiguration = {}
) => {
  const fetcher = (url: string, token: string) =>
    fetch(url, { headers: { Authorization: 'Bearer ' + token } })
      .then((res) => res.json())
      .then((dat) => dat);
  const { data, error, mutate } = useSWR(
    token ? [endPointUrl, token] : null,
    fetcher
  );

  return {
    wishList: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
    mutate,
  };
};
