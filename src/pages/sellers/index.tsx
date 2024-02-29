import React from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';

const Vendedores = () => {
  return (
    <>
      <LayoutShopSimple
        title="Vendedores"
        pageDescription="Información de vendedores"
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
                ¿Cómo es todo el proceso para vendedores independientes?
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
                  Crea una cuenta en nuestro sitio www.weexa.net
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
                  Una vez hayas iniciado sesión en tu cuenta, puedes copiar
                  enlaces de productos ofrecidos en el sitio y compartirlos en
                  tus redes sociales, grupos, páginas, whatsapp, Instagram o
                  cualquier medio donde creas que las personas comprarán dichos
                  productos.
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
                  Cuando alguien adquiere un producto derivado de un enlace
                  publicado por ti, automáticamente se te depositará la comisión
                  en tu cartera virtual en el sitio, los cuales podrás cobrar
                  ingresando un número de cuenta para transferencia una vez
                  pasados 7 días de la compra. Para cobrar, debes tener un
                  mínimo de Q75.00
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
                  Tu puedes requerir pago de tus comisiones en cualquier momento
                  una vez hayan pasado 7 días de la fecha de compra, siempre que
                  tengas al menos Q75.00 en tu cartera.
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
                  Tu cartera mostrará dos cantidades: Saldo total y saldo
                  disponible: El saldo total reflejará todas las comisiones
                  ganadas hasta ese momento y el saldo disponible reflejará el
                  dinero que puedes retirar en ese momento.
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
                  Se espera 7 días para liberar tus comisiones para permitir que
                  todas tus ventas sean entregadas al comprador final y que no
                  sean retornadas.
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
                  Si en algún momento el comprador final no recibe el producto
                  comprado o lo regresa por algún motivo, esa comisión será
                  extraída de tus comisiones porque ya se te había acreditado y
                  en realidad no hubo ninguna venta.
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
                  Los productos se envían por cobrar con una empresa de entregas
                  para que así todas las personas puedan adquirir los productos
                  que tu publiques sin necesidad de contar con una tarjeta de
                  crédito o débito.
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
                  Entre más enlaces publiques, más comisiones puedes ganar.
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
                  La cantidad de la comisión podría variar, pero la más chica es
                  de Q7.50 por cada venta.
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
                  La única manera de cobrar sin que tengas al menos Q75 en tu
                  cuenta es que cierres tu cuenta.
                </dd>
              </div>
            </div>
            {/*Aqui VA */}
            <div>
              <h2 className="mt-2 text-lg font-semibold text-sky-600">
                Novedades
              </h2>
              <p className="text-justify mt-1 text-base text-gray-500">
                Hay una opción donde puedes ganar mucho más dinero creando WISH
                LISTS o Listas de deseos. En esta opción, tu creas una lista de
                deseos para algún evento, por ejemplo: un baby shower, en el
                cual puedes agregar productos de niño o niña a la lista como
                biberones, pañales, shampoo, aceites, frazadas, ropita, o
                cualquier artículo para niños que esté disponible en el sitio y
                cuando alguien tenga un baby shower, publique tu lista y sus
                amigos compren todos esos productos, tu recibirás las comisiones
                por cada una de esas ventas.
              </p>
              <p className="text-justify mt-1 text-base text-gray-500">
                Si es un quinceaños, puedes ofrecer crear una lista para el
                evento y que la quinceañera la publique entre sus amigos, así
                ella misma decide que desea que le regalen y tu obtienes las
                comisiones y así sucesivamente, puedes crear listas de deseos
                para bodas, despedidas de soltera, día de la madre, día del
                padre, graduación, Etcétera. Hazte miembro hoy mismo en
                www.weexa.net
              </p>
              <p className="text-justify mt-1 text-base text-gray-500">
                Vamos! Date una oportunidad, no tienes nada que perder y hay
                mucho por ganar.
              </p>
              <img
                className="mt-4 h-56 w-full object-cover sm:h-72 md:h-screen lg:min-h-fit lg:w-full"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </LayoutShopSimple>
    </>
  );
};

export default Vendedores;
