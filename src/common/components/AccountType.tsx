import React, { FC } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  FORM_REGISTER_INITIAL_STATE,
  IFormRegister,
  useDispatchRegister,
  useRegister,
} from '../../pages/auth/register/context/RegisterContext';
import { ButtonSubmit } from '@common/ButtonSubmit';
import { CheckCircleIcon } from '@heroicons/react/solid';

const accountTypes = [
  {
    type: 'SELLER_USER',
    title: 'Vendedor Independiente',
    name: 'type',
    description: 'Conviértete en un vendedor y aumenta tus ingresos',
  },
  {
    type: 'WAREHOUSE_USER',
    title: 'Almacén',
    name: 'type',
    description: 'Si tienes una empresa, puedes vender en nuestro sitio',
  },
];

const validationSchema = Yup.object({
  type: Yup.string().required('Campo requerido elija una opción'),
});

const AccountType = () => {
  const { formRegister } = useRegister();
  const { next, resetState } = useDispatchRegister();

  const onChange = (values: any) => {
    handleSubmit({ type: values });
  };

  const handleSubmit = (values: IFormRegister) => {
    if (formRegister.type === '' || formRegister.type === values.type) {
      next(values);
    } else {
      resetState(values);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
      <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
        Elige el tipo de cuenta que quieres crear
      </h2>
      <Formik
        initialValues={{ ...formRegister }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, isValid, isSubmitting, errors, touched, values }) => (
          <Form>
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="grid gap-2"
            >
              {accountTypes.map(({ type, title, name, description }) => (
                <div
                  onClick={() => onChange(type)}
                  className="relative"
                  key={type}
                >
                  <input
                    defaultChecked={type === formRegister.type}
                    id={title}
                    className="sr-only peer"
                    type="radio"
                    value={type}
                    onClick={() => handleSubmit(values)}
                    name={name}
                  />

                  <label
                    htmlFor={title}
                    className="flex flex-col p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-sky-500 peer-checked:ring-2 peer-checked:border-transparent"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {title}
                    </span>
                    <p className="mt-1 flex items-center text-sm text-gray-500">
                      {description}
                    </p>
                  </label>
                  <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
                    <CheckCircleIcon
                      className="h-5 w-5 text-sky-600"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
            {errors.type && touched.type && (
              <p className="mt-2 text-sm text-red-600">{errors.type}</p>
            )}
            <div className="py-4 mt-2">
              {/* <ButtonSubmit
                type='submit'
                isValid={isValid}
                isSubmitting={isSubmitting}
                descriptionButton='Siguiente'
              /> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountType;
