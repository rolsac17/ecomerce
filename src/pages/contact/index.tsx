import AdminLayout from 'layouts/AdminLayout';
import Auth from '@components/Auth';
import React from 'react';
import { ChatAlt2Icon, ClockIcon, MailIcon } from '@heroicons/react/solid';

const Contact = () => {
  return (
    <>
      <Auth>
        <AdminLayout
          title="Contacta con Weexa"
          pageDescription="Sección de contacto para almacenes y vendedores con weexa"
        >
          <div className="bg-white">
            <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
                    Contacta con Nosotros
                  </h2>
                  <div className="mt-3">
                    <p className="text-lg text-gray-500">
                      Si tienes alguna duda, comentario o sugerencia puedes
                      contactarnos y nos comunicaremos contigo lo antes posible.
                    </p>
                  </div>
                  <div className="mt-9">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ChatAlt2Icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3 text-base text-gray-500">
                        <p>
                          <a href="https://wa.me/36634549">Whatssap</a>
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-6">
                      <div className="flex-shrink-0">
                        <ChatAlt2Icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3 text-base text-gray-500">
                        <p>
                          <a href="https://www.facebook.com/weexagt.">
                            Facebook
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex">
                      <div className="flex-shrink-0">
                        <MailIcon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3 text-base text-gray-500">
                        <p>info@weexa.net</p>
                      </div>
                    </div>

                    <div className="flex mt-6">
                      <div className="flex-shrink-0">
                        <ClockIcon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3 text-base text-gray-500">
                        <p>Horarios de Atención</p>
                        <p className="mt-1">Lunes-Viernes 9:00 am a 5:00 pm</p>
                        <p className="mt-1">Sábados 9:00 am a 12:30 pm</p>
                        <p className="mt-1">Domingo Cerrado</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 sm:mt-16 md:mt-0 flex justify-center">
                  <img
                    className="block m-auto h-auto"
                    src="https://i.postimg.cc/T276N2vS/TCWexa.png"
                    alt="icono wexa"
                  />
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </Auth>
    </>
  );
};

export default Contact;
