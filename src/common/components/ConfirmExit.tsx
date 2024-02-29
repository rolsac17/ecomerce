import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import { useDispatchRegister } from '../../pages/auth/register/context/RegisterContext';
import { useRouter } from 'next/router';

const ConfirmExit = () => {
  const router = useRouter();
  const { formComplete } = useDispatchRegister();

  const handleConfirmExit = async () => {
    await router.push('/');
    formComplete();
  };
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
      <div className="flex justify-center items-center flex-col">
        <figure className="h-20 w-20 rounded-full flex justify-center items-center bg-green-100">
          <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://i.postimg.cc/Cx2wTrNb/TCWexa.png"
            alt="Logo Weexa"
          /> */}
        </figure>
        <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
          ¡Registro con éxito!
        </p>
        <p className="mt-2 text-lg leading-6 font-medium text-gray-900">
          Bienvenido a la familia más grande de Guatemala. Recibimos tu
          información correctamente
        </p>
        <button
          onClick={() => handleConfirmExit()}
          type="button"
          className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ConfirmExit;
