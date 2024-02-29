import { Form, Formik } from 'formik';
import { ButtonSubmit } from '@common/ButtonSubmit';
import { MyTextInput } from '@common/MyTextInput';
import { XCircleIcon } from '@heroicons/react/solid';

import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { useRouter } from 'next/router';
import { classNames } from '@utils/class-names';
import { logIn, selectAuth, setShowModal } from '@redux/states/Auth';
import { validationSchemaLogin } from './validationForm';
import { useEffect } from 'react';

type FormDataLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const { success, error } = useAppSelector(selectAuth);
  const router = useRouter();
  const handleSubmit = (
    { email, password }: FormDataLogin,
    onSubmitProps: any
  ) => {
    dispatch(logIn(email, password));
    onSubmitProps.setSubmitting(false);
  };

  useEffect(() => {
    if (success) {
      dispatch(setShowModal(false));
      router.push('/checkout/address');
    }
  }, [success]);

  return (
    <div className="w-full">
      <div
        className={classNames(
          error ? 'flex' : 'hidden',
          'rounded-md bg-red-50 p-4'
        )}
      >
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            No reconocemos ese usuario / contraseña
          </h3>
        </div>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchemaLogin}
        onSubmit={handleSubmit}
      >
        {({  isValid, isSubmitting}) => (
          <Form className="grid grid-cols-6 gap-6" noValidate>
            {/* Dpi */}
            <div className="col-span-6">
              <MyTextInput
                name="email"
                label="Correo Electronico"
                type="email"
                col="col-span-6"
                autoComplete="off"
              />
            </div>
            {/* Nombre */}
            <MyTextInput
              name="password"
              label="Contrasena"
              type="password"
              col="col-span-6"
              autoComplete="off"
            />
            <div className="py-4 text-center col-span-6">
              <ButtonSubmit
                type="submit"
                isValid={isValid}
                isSubmitting={isSubmitting}
                descriptionButton="Entrar"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
