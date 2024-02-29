import { Form, Formik, yupToFormErrors } from 'formik';
import { useRouter } from 'next/router';
import { ButtonSubmit, MyTextInput } from '@common/index';
import endPoints from '@services/api';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { logIn, selectAuth } from '@redux/states/Auth';
import { UserTypes } from 'interfaces/IUser';

interface FormDataLogin {
  email: string;
  password: string;
}

const FormLogin = () => {
  const dispatch = useAppDispatch();
  const { success, error, user, message } = useAppSelector(selectAuth);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (
    { email, password }: FormDataLogin,
    onSubmitProps: any
  ) => {
    dispatch(logIn(email, password));
    onSubmitProps.setSubmitting(false);
  };

  useEffect(() => {
    if (success) {
      switch (user.type.trim()) {
        case UserTypes.ADMINISTRATOR:
          router.push('/admin');
          break;
        case UserTypes.WAREHOUSE_USER:
          router.push('/admin');
          break;
        case UserTypes.SELLER_USER:
          router.push('/admin');
          break;
        case UserTypes.CLIENT_USER:
          router.push('/');
          break;
        default:
          break;
      }
    }
  }, [success]);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Requerido')
            .email('Ingrese un formato de correo valido'),
          password: Yup.string()
            .required('Requerido')
            .min(6, 'No debe ser menor a 6 caracteres'),
        })}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-6">
            {/* Campo de email */}
            <MyTextInput
              label="Correo"
              name="email"
              type="email"
              autoComplete="off"
            />
            {/* Campo de Clave */}
            <MyTextInput
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
            />
            <div></div>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {console.log(message)}
                      {message === 'PENDING_USER' ? (
                        <>Tu cuenta se activará tan pronto nos comuniquemos contigo vía telefónica.</>
                      ) : (
                        <>Los datos ingresados no son validos!</>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="showPassword"
                  name="showPassword"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-cblue-500 focus:ring-cblue-500"
                />
                <label
                  htmlFor="showPassword"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Mostrar contraseña
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="../auth/reset-password"
                  className="font-medium text-blue-500 hover:text-blue-800"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div className="py-4 text-center col-span-6">
              <ButtonSubmit
                type="submit"
                isValid={isValid}
                isSubmitting={isSubmitting}
                descriptionButton="Iniciar sesión"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormLogin;
