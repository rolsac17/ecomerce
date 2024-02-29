import { LoadingOrder } from '@components/ecommerce';
import { NoResult } from '@components/ecommerce/orders';
import {
  ShipmentsContainer,
  ShipmentsHead,
} from '@components/ecommerce/shipments';
import { useShipmentsPublicByOrderId } from '@hooks/useShipmentsPublicByOrderId';
import endPoints from '@services/api';
import { format } from '@utils/currency';
import { ShipmentsStatus } from 'interfaces/IShipments';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Shipments = () => {
  const router = useRouter();
  const { id } = router.query;
  const { shipments, isLoading, isError } = useShipmentsPublicByOrderId(
    `${id}`
  );

  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | Envíos"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      <ShipmentsContainer>
        <ShipmentsHead />
        {isLoading && <LoadingOrder />}
        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-20">
            {shipments.map((shipment) => (
              <div key={shipment.shipmentId}>
                <h3 className="sr-only">
                  Order placed on{' '}
                  <time dateTime={shipment.createdAt}>
                    {shipment.createdAt}
                  </time>
                </h3>
                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                  <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:flex sm:justify-between sm:flex-row sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                    <div className="flex justify-between sm:block">
                      <dt className="font-medium text-gray-900">Transporte</dt>
                      <dd className="sm:mt-1">{shipment.transportCompany}</dd>
                    </div>
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">
                        Fecha de envió
                      </dt>
                      <dd className="sm:mt-1">
                        <time dateTime={shipment.deliveredAt}>
                          {shipment.deliveredAt.substr(0, 10)}
                        </time>
                      </dd>
                    </div>
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">
                        Numero de guía
                      </dt>
                      <dd className="sm:mt-1">{shipment.guideNumber}</dd>
                    </div>
                    <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                      <dt>Total</dt>
                      <dd className="sm:mt-1">{format(shipment.total)}</dd>
                    </div>
                  </dl>
                  <Link href={shipment.transportCompanyTraceUrl} passHref>
                    <a
                      target="_blank"
                      className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                    >
                      Ir al sitio
                      <span className="sr-only">
                        for order {shipment.guideNumber}
                      </span>
                    </a>
                  </Link>
                </div>
                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                      >
                        Producto
                      </th>
                      <th
                        scope="col"
                        className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                      >
                        Precio
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                    {shipment.detail.map((product) => (
                      <tr key={product.productId}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            {product.productImages[0].principal && (
                              <Image
                                src={`${endPoints.files.download}/${product.productImages[0].key}`}
                                alt={product.productName}
                                width={64}
                                height={64}
                                className="w-full h-full object-center object-cover"
                              />
                            )}

                            <div>
                              <div className="font-medium text-gray-900">
                                {}
                              </div>
                              <div className="mt-1 sm:hidden">
                                {product.productName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{format(product.price)}</td>
                        <td>
                          {shipment.shipmentStatus === ShipmentsStatus.Send
                            ? 'Enviado '
                            : 'Retornado '}
                          {new Intl.DateTimeFormat('es-ES', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }).format(new Date(shipment.sendAt))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
        {isError && <NoResult message={'Aun no hay envíos'} />}
      </ShipmentsContainer>
    </LayoutShopSimple>
  );
};

export default Shipments;
