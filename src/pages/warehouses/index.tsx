import React from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';

const Almacenes = () => {
  return (
    <>
      <LayoutShopSimple
        title="Almacenes"
        pageDescription="Información de almacenes"
      >
        <div className="bg-white">
          <div className="lg:text-center">
            <img
              className="block m-auto h-auto"
              src="https://i.postimg.cc/T276N2vS/TCWexa.png"
              alt="icono weexa"
            />
          </div>
          <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-2 lg:px-8">
            <div>
              <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                ¿Cómo es todo el proceso para almacenes?
              </p>

              <div key="1" className="mt-2 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    1
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  El almacén se inscribe en nuestro sitio para publicar sus
                  productos.
                </dd>
              </div>

              <div key="2" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    2
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  Un agente de WEEXA se comunica con el almacén para
                  verificación.
                </dd>
              </div>

              <div key="3" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    3
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  Una vez WEEXA activa al almacén en sistema, este puede iniciar
                  a publicar los productos que tiene a la venta.
                </dd>
              </div>

              <div key="4" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    4
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  Cada vez que un producto es publicado por el almacén, nuestros
                  vendedores reciben una notificación e inmediatamente publican
                  en sus redes, páginas, grupos, whatsapp o donde tengan amigos
                  de confianza (Clientes potenciales) que comprarán los
                  productos.
                </dd>
              </div>

              <div key="5" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    5
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  Los productos serán adquiridos en modalidad de PAGO CONTRA
                  ENTREGA para así abarcar todo el mercado disponible por las
                  personas que no cuentan con una tarjeta para compras.
                </dd>
              </div>

              <div key="6" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    6
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  Cuanto el consumidor final hace una orden, la notificación
                  llega al almacén y se graba en nuestro sistema como una venta.
                </dd>
              </div>

              <div key="7" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    7
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  El almacén prepara la orden y la envía directamente al
                  consumidor final.
                </dd>
              </div>

              <div key="8" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    8
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  La empresa de paquetería colecta el costo del producto y del
                  envío del cliente final durante la entrega y reporta al
                  almacén lo que le corresponde.
                </dd>
              </div>

              <div key="9" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    9
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  Al final de mes, el almacén contabiliza las ventas derivadas
                  de WEEXA (Que estarán grabadas en su usuario en el mismo
                  sitio) y pagará a WEEXA por las comisiones de esas ventas.
                </dd>
              </div>

              <div key="10" className="mt-4 relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    10
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  La cantidad a pagar de comisión la establece el almacén,
                  teniendo en cuenta que la cuota mínima es de quince quetzales
                  por venta. Entre más comisión, más se incentivará a los
                  vendedores a publicar sus productos y como resultado tendrá
                  muchas más ventas que se traducirán en ganancias para el
                  almacén.
                </dd>
              </div>

              <div key="11" className="mt-4 relative mb-10">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    11
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  El almacén emitirá factura por el precio total del producto al
                  cliente final y WEEXA le emitirá factura por servicios al
                  almacén para que cuadren sus libros después de pagar las
                  comisiones por ventas a WEEXA.
                </dd>
              </div>

              <div key="12" className="mt-4 relative mb-10">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                    12
                  </p>
                </dt>
                <dd className="text-justify mt-2 ml-9 text-base text-gray-500">
                  El almacén no paga absolutamente nada para ser parte de WEEXA
                  ni por cargar sus productos en WEEXA y no hay límite de
                  productos a cargar. Solo paga comisiones a fin de mes si hay
                  ventas realizadas por nuestro equipo.
                </dd>
              </div>
            </div>
            {/*Aqui VA */}
            <div>
              <img
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
                src="https://i.postimg.cc/LsDvSfmQ/Almacen.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </LayoutShopSimple>
    </>
  );
};

export default Almacenes;
