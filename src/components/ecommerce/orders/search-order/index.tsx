import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '@common/MyTextInput';
import { ButtonSubmit } from '@common/ButtonSubmit';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { searchOrderById } from '@redux/states/Orders';

export interface FormSearchOrder {
  orderId: string;
  email: string;
}
export const EmptyFormSearchOrder: FormSearchOrder = {
  orderId: '',
  email: '',
};
export const validationSchemaLogin = Yup.object({
  orderId: Yup.number().required('Ingrese un número de orden valido'),
  email: Yup.string()
    .required('Requerido')
    .email('Ingrese un formato de correo valido'),
});

export const SearchOrder = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (
    { orderId, email }: FormSearchOrder,
    onSubmitProps: any
  ) => {
    dispatch(searchOrderById(orderId, email));
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();    
  };

  return (
    <div className="mt-8">
      <Formik
        initialValues={EmptyFormSearchOrder}
        validationSchema={validationSchemaLogin}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="grid grid-cols-12 gap-6" noValidate>
            {/* orderId */}
            <div className="col-span-12 md:col-span-3">
              <MyTextInput
                name="orderId"
                label="Numero de orden"
                type="number"
                col="col-span-6"
                autoComplete="off"
              />
            </div>
            {/* Email */}
            <MyTextInput
              name="email"
              label="Email o correo electrónico"
              type="email"
              col="col-span-12 md:col-span-6"
              autoComplete="off"
            />
            <div className="py-4 text-center col-span-12 md:col-span-3 mt-2">
              <ButtonSubmit
                type="submit"
                isValid={isValid}
                isSubmitting={isSubmitting}
                descriptionButton="Buscar"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
