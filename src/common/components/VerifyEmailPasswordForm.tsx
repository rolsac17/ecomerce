import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import validationSchemaVerifyEmail from '../models/validationSchemaVerifyEmail';
import { MyTextInput, ButtonSubmit, ButtonBack } from '@common/index';
import {
  useDispatchRegister,
  useRegister,
  IFormRegister,
} from '../../pages/auth/register/context/RegisterContext';

const VerifyEmailPasswordForm = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { formRegister } = useRegister();
  const { signup, previous, next, sendOtp } = useDispatchRegister();

  const handleSubmitSignup = (values: IFormRegister, onSubmitProps: any) => {
    signup(values).then(({ hasError, message }) => {
      setError(hasError);
      setMessage(message);

      if (!hasError) {
        next(values);
      }
    });
    onSubmitProps.setSubmitting(false);
  };
  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Confirma tu dirección de correo electrónico
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hemos enviado un código de confirmación al correo{' '}
          <strong className="text-gray-900 mr-1">{formRegister.email}</strong>
          Ingresa y verifica.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={{ ...formRegister }}
            validationSchema={validationSchemaVerifyEmail}
            onSubmit={handleSubmitSignup}
          >
            {({ isValid, values, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Otp*/}
                <MyTextInput
                  autoComplete="off"
                  label="Código de verificación (otp)"
                  name="otp"
                  type="text"
                />
                {/* password */}
                <MyTextInput
                  autoComplete="off"
                  label="Contraseña"
                  name="password"
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

                <div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{message}</p>
                  )}
                </div>
                <div className="py-4 text-center col-span-6">
                  <ButtonSubmit
                    type="submit"
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                    descriptionButton="Guardar"
                  />
                  <ButtonBack type="button" onClick={() => previous(values)} />
                </div>
                <div className="text-sm flex gap-2 justify-center">
                  <p className="text-gray-900">No recibiste el correo?</p>
                  <button
                    type="button"
                    onClick={() => sendOtp(values)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Reenviar Código?
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPasswordForm;
