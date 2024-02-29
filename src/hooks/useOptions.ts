import endPoints from '@services/api';
import useSWR, { SWRConfiguration } from 'swr';

const useOptions = (
  token: string,
  config: SWRConfiguration = {}
) => {
  
  const fetcher = (url:any, token:any) => fetch(url, { headers: { Authorization: "Bearer " + token }}).then((res) => res.json()).then((dat) => dat);
  const { data, error } = useSWR(token ? [endPoints.options, token] : null, fetcher);


  return  {
    data: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};

export default useOptions;
