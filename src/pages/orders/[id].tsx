import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import endPoints from '@services/api';
import { format } from '@utils/currency';
import axios from 'axios';
import {
  IPublicOrder,
  IPublicOrderDetail,
  ResponsePublicOrder,
} from 'interfaces/IPublicOrder';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  order: IPublicOrder;
}
const OrderByIdPage: React.FC<Props> = ({ order }) => {
  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | Orders"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 lg:pb-24">
        <div className="flex flex-col md:flex-row justify-between items-center space-x-2">
          <div className='mb-2 md:mb-0'>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Orden #{order.orderId} creada con éxito
              </h1>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Te notificaremos por correo electrónico cuando te enviemos tu pedido.
            </p>
          </div>
          <Link href={'/'} passHref replace>
            <a className="inline-flex md:max-w-none justify-center items-center rounded-md border border-transparent bg-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <ArrowCircleLeftIcon className="h-6 w-6 mr-4" />
              Ir a la tienda
            </a>
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="space-y-20">
            <div>
              <h3 className="sr-only">
                Order placed on{' '}
                <time dateTime={order.createdAt}>{order.createdAt}</time>
              </h3>

              <div className="rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                <dl className="flex-auto sm:flex space-y-6 divide-y divide-gray-200 text-sm text-gray-600  sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:gap-x-8">
                  <div className="flex justify-between sm:block">
                    <dt className="font-medium text-gray-900">Fecha</dt>
                    <dd className="sm:mt-1">
                      <time dateTime={order.createdAt}>
                        {order.createdAt.substr(0, 10)}
                      </time>
                    </dd>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-gray-900">
                      Número de pedido
                    </dt>
                    <dd className="sm:mt-1">{order.orderId}</dd>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-gray-900">
                      Costo de envío
                    </dt>
                    <dd className="sm:mt-1">{format(order.costOfShipping)}</dd>
                  </div>
                  <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                    <dt>Total</dt>
                    <dd className="sm:mt-1">{format(order.total)}</dd>
                  </div>
                </dl>
                <div className="flex justify-between space-x-2 md:space-x-0 pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                  <dt className="font-medium text-gray-900">
                    Dirección de entrega
                  </dt>
                  <dd className="sm:mt-1">{order.shippingAddress}</dd>
                </div>
              </div>

              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                <caption className="sr-only">Productos</caption>
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
                      Cantidad
                    </th>
                    <th scope="col" className="w-0 py-3 text-right font-normal">
                      Info
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                  {order.detail?.map((det: IPublicOrderDetail) => (
                    <tr key={det.productId}>
                      <td className="py-6 pr-8">
                        <div className="flex items-center">
                          <div className="mr-6 h-16 w-16 rounded">
                            {det?.productImages
                              .filter((img) => img.principal === true)
                              .map((img) => (
                                <Image
                                  key={img.key}
                                  src={`${endPoints.files.download}/${img.key}`}
                                  alt={det.productDescription}
                                  width="100%"
                                  height="100%"
                                  layout="responsive"
                                  objectFit="contain"
                                />
                              ))}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {det.productName}
                            </div>
                            <div className="mt-1 sm:hidden">
                              {format(det.price)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">
                        {format(det.price)}
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">
                        X{det?.quantity}
                      </td>
                      <td className="whitespace-nowrap py-6 text-right font-medium">
                        <Link href={`/product/${det.productId}`}>
                          <a className="text-blue-600">Ver Producto</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutShopSimple>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    const { data } = await axios.get<ResponsePublicOrder>(
      endPoints.orders.public(id)
    );
    return {
      props: {
        order: data.content,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default OrderByIdPage;
