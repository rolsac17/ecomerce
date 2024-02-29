import {
  CashIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from '@heroicons/react/outline';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import React from 'react';

const features = [
  {
    name: '¿Como lo Hacemos?',
    description:
      'En WEEXA conectamos al comprador final con almacenes que ofrecen sus productos a la venta utilizando vendedores independientes que comparten vínculos de los productos en su comunidad cibernética. ',
    icon: GlobeAltIcon,
  },
  {
    name: '¿Quiénes Pueden Ganar Dinero con WEEXA?',
    description:
      'Cualquier persona que cuente con un teléfono o computadora con internet y desee publicar enlaces de los productos ofrecidos por los almacenes que venden a través de WEEXA. También los almacenes que ofrezcan productos a la venta',
    icon: ScaleIcon,
  },
  {
    name: '¿Cuánto tengo que pagar para ganar dinero en WEEXA?',
    description:
      'Absolutamente nada, no hay seminarios, ni cursos, ni ninguna clase de inversión por pagar. Es más, no tiene ni siquiera que gastar dinero en armar un expediente personal porque no es requerido. Solo debe registrarse en la plataforma: www.weexa.net ya sea como como vendedor independiente o como almacén distribuidor de productos y listo! Solo debe contar con un dispositivo e internet.',
    icon: LightningBoltIcon,
  },
  {
    name: '¿Cómo puedo iniciar a ganar dinero con WEEXA?',
    description:
      'Si eres una persona individual que desea ganar comisiones por ventas, puedes registrarte como vendedor independiente en www.weexa.net y puedes iniciar a ganar dinero al instante desde la comodidad de tu casa sin necesidad de viajar o invertir en absolutamente nada. Si eres un almacén que ofrece sus productos, puedes registrarte como almacén en www.weexa.net  subir tus productos a la plataforma y nuestros vendedores independientes los ofrecerán en su comunidad electrónica para que tus productos se vendan mucho más rápido y en mayores cantidades porque el cliente primero le compra al vendedor, luego a la empresa. ',
    icon: CashIcon,
  },
];
const Nosotros = () => {
  return (
    <>
      <LayoutShopSimple title="Nosotros" pageDescription="Información de weexa">
        <div className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-lg font-semibold text-blue-600">
                <img
                  className="block m-auto h-auto"
                  src="https://i.postimg.cc/T276N2vS/TCWexa.png"
                  alt="icono wexa"
                />
              </h2>
              <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                ¿Quiénes Somos?
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                WEEXA es una plataforma donde puedes ganar dinero desde casa sin
                tener que invertir en absolutamente nada.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      <div className="text-justify">{feature.description}</div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:text-center">
              <p className="mt-4 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                ¿Qué nos Hace Diferentes?
              </p>
              <div className="text-justify">
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  En WEEXA contamos con una red de vendedores independientes a
                  nivel nacional quienes publican constantemente los productos
                  cargados a nuestra plataforma por los almacenes y de esta
                  cuenta, cada vendedor publica productos en su localidad como
                  si él o ella los vendiera, creando así esa confianza de
                  comprar, porque el comprador primero le compra al vendedor,
                  luego a la empresa.
                </p>
                <p className="mt-2 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Hazte miembro hoy mismo en www.weexa.net
                </p>
                <p className="mt-2 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Vamos! Date una oportunidad, no tienes nada que perder y hay
                  mucho por ganar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutShopSimple>
    </>
  );
};

export default Nosotros;
