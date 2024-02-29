import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

const fetcher = (url: string, accessToken: string) => {
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data);
};

export const useGetUsers = (
  endPointUrl: string,
  accessToken: string,
  type: string,
  config: SWRConfiguration = { fetcher }
) => {
  const { data, error } = useSWR(
    type ? [endPointUrl, accessToken] : null,
    config
  );
  return {
    users: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};
