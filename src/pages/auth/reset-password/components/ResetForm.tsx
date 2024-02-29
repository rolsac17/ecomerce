import { Formik, Form } from 'formik';
import validationSchemaEmail from '@common/models/validationSchemaEmail';
import validationSchemaVerifyEmail from '@common/models/validationSchemaVerifyEmail';
import { MyTextInput, ButtonSubmit, ButtonBack } from '@common/index';
import { useState } from 'react';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';
import { CheckIcon } from '@heroicons/react/solid';
import { AnyAction } from '@reduxjs/toolkit';

const ResetForm = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAppSelector(selectAuth);
  const [confirm, setConfirm] = useState(false);
  const [reset, setReset] = useState({
    email: '',
    password: '',
    otp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
   
  const OnChange = (otp:any) => {
    setReset({...reset,  otp: otp})
    setError(false);
  }

  const handleSubmitSignup = (values: any, onSubmitProps: any) => {
    if (user !== null) {
      fetch(`${endPoints.users.resetPassword}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: reset.email,
          otp: values.otp,
          password: values.password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          setError(dat.message === "El código ingresado es invalido" ? true : false);
          setMessage(dat.message);

          if (dat.code) {
            setIsSubmitting(false);
            setConfirm(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [next, setNext] = useState(false);

  const submitEmail = (email: any) => {
    if (user !== null) {
      setReset({
        email: email,
        otp: '',
        password: '',
      });
      fetch(`${endPoints.otp.sendOtp}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            setIsSubmitting(false);
            setNext(true);
            setMessage('Se ha enviado el codigo de verificacion!');
          }
        });
    }
  };

  return confirm === false ? (
    next === false ? (
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Confirma tu correo electrónico
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Estaremos enviando un código de verificación vía email para validar
            si la cuenta te pertenece
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                email: '',
              }}
              onSubmit={(values: any) => {
                setIsSubmitting(true);
                submitEmail(values.email);
              }}
              validationSchema={validationSchemaEmail}
            >
              {() => (
                <Form className="space-y-6">
                  {/* Email */}
                  <MyTextInput
                    label="Email"
                    name="email"
                    placeholder="example@gmail.com"
                    type="email"
                  />
                  <div className="py-4 text-center col-span-6">
                    <ButtonSubmit
                      type="submit"
                      isValid={true}
                      isSubmitting={isSubmitting}
                      descriptionButton="Siguiente"
                    />
                    <button
                      type="button"
                      onClick={() => (window.location.href = '../auth/login')}
                      className="mt-6 bg-transparent text-gray-400 hover:text-gray-500 font-bold py-1  inline-flex items-center border-b-2 border-gray-400 hover:border-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                      <span>Iniciar sesión</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Restablecer tu contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tu nueva contraseña + el código de verificación que hemos
            enviado a tu correo
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                password: '',
                otp: '',
                email: '',
              }}
              onSubmit={handleSubmitSignup}
              validationSchema={validationSchemaVerifyEmail}
            >
              {({ isValid, handleChange }) => (
                <Form className="space-y-6">
                  <input hidden />
                  {/* password */}
                  <MyTextInput
                    autoComplete="off"
                    label="Contraseña"
                    name="password"
                    values=""
                    placeholder="********"
                    type="password"
                  />
                  {/* confirm password */}
                  <MyTextInput
                    autoComplete="off"
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    placeholder="********"
                    type="password"
                  />
                  {/* Otp*/}
                  <MyTextInput
                    autoComplete="off"
                    label="Código de verificación (otp)"
                    name="otp"
                    id="otp"
                    onChange={(e: any) => {
                      handleChange(e);
                      OnChange(
                        e.target.value
                      );
                    }}
                    type="text"
                  />{' '}
                  <div>
                    {error && (
                      <p className="text-sm font-normal text-red-600">{message}</p>
                    )}
                  </div>
                  <div className="py-4 text-center col-span-6">
                    <ButtonSubmit
                      type="submit"
                      isValid={isValid}
                      isSubmitting={isSubmitting}
                      descriptionButton="Guardar"
                    />
                    <button
                      type="button"
                      onClick={() => setNext(false)}
                      className="mt-6 bg-transparent text-gray-400 hover:text-gray-500 font-bold py-1  inline-flex items-center border-b-2 border-gray-400 hover:border-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                      <span>Regresar</span>
                    </button>
                  </div>
                  <div className="text-sm flex gap-2 justify-center">
                    <p className="text-gray-900">No recibiste el correo?</p>
                    <button
                      type="button"
                      onClick={() => setNext(false)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Reenviar Código
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
      <div className="flex justify-center items-center flex-col">
        <figure className="h-20 w-20 rounded-full flex justify-center items-center bg-green-100">
          <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
        </figure>
        <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
          ¡Cambio de contraseña exitoso!
        </p>
        <button
          onClick={() => (window.location.href = '../auth/login')}
          type="button"
          className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ResetForm;
