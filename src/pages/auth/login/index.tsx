import { LoginLayout } from 'layouts/LoginLayout';
import React from 'react';
import FormLogin from './components/FormLogin';
import ImageLogin from './components/ImageLogin';

const Login = () => {
  return (
    <LoginLayout
      title="La tienda oficial Weexa | Login"
      pageDescription="Login www.weexa.net"
    >
      <>
        <div
          className="
        flex-1 flex flex-col 
        justify-center py-12 px-4 
        sm:px-6 lg:flex-none lg:px-20 xl:px-24"
        >
          <div
            className="
          mx-auto my-28 w-full max-w-sm lg:w-96"
          >
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                WEEXA
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                {/* Formulario */}
                <FormLogin />
                {/* Formulario */}
              </div>
            </div>
          </div>
        </div>
        {/* Imagen */}
        <ImageLogin />
        {/* Imagen */}
      </>
    </LoginLayout>
  );
};

export default Login;
