import endPoints from '@services/api';
import useSWRInfinite from 'swr/infinite';

export const useInfiniteSWR = () => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex += pageIndex;
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${endPoints.products.getInitialProdutcs}?offset=${pageIndex}&limit=10`; // SWR key
  };

  const { data, error, mutate, size, setSize, isValidating } =
    useSWRInfinite(getKey);

  const resultData = data?.map(({ content }) => console.log(content));
  return {
    resultData,
    data,
    size,
    setSize,
    isValidating,
  };
};
