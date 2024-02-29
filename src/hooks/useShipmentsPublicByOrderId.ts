import endPoints from '@services/api';
import { ShipmentsResponse } from 'interfaces/IShipments';
import useSWR, { SWRConfiguration } from 'swr';

export const useShipmentsPublicByOrderId = (
  orderId: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR<ShipmentsResponse, Error>(
    orderId ? endPoints.shipmentsPublicByOrderId(orderId) : null,
    config
  );

  if (data?.message.toLowerCase() === 'error: shipments not found') {
    return {
      shipments: data?.content || [],
      isLoading: false,
      isError: true,
    };
  }

  return {
    shipments: data?.content || [],
    isLoading: !error && !data?.content,
    isError: error,
  };
};
