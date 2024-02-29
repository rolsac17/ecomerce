import React, { useEffect, useState } from 'react';
import { ButtonSubmit } from '@common/ButtonSubmit';
import { MyTextInput } from '@common/MyTextInput';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MySelect } from '@common/MySelect';
import { useEvents } from '@hooks/useEvents';
import endPoints from '@services/api';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { Events } from 'interfaces/IEvents';
import { createWishlist, updateWishlist } from '@redux/states/Wishlist/thunks';
import {
  MethodWishlist,
  selectWishlist,
} from '@redux/states/Wishlist/wishlistSlice';

export interface FormWishList {
  name: string;
  eventId: number;
}

export const schemaFormWishList = Yup.object({
  name: Yup.string()
    .required('Requerido')
    .min(6, 'No debe ser menor a 6 caracteres')
    .max(45, 'Longitud maxica 20 caracteres'),
  eventId: Yup.number()
    .required('Seleccione una opcion valida')
    .positive('Seleccione una opcion valida'),
});

export const FormWishList = () => {
  const {
    user: { token },
  } = useAppSelector(selectAuth);
  const [getEventId, setGetEventId] = useState(-1);
  const dispatch = useAppDispatch();
  const { success, loading, error, message, isMethod, wishlist } =
    useAppSelector(selectWishlist);

  const { events } = useEvents(endPoints.events.getEvents, token);

  const FormEmptyState: FormWishList = {
    name: isMethod === MethodWishlist.UPDATE ? wishlist?.name! : '',
    eventId: getEventId,
  };

  const handleSubmit = (
    { name, eventId }: FormWishList,
    onSubmitProps: any
  ) => {
    isMethod === MethodWishlist.CREATE
      ? dispatch(createWishlist({ name, eventId }))
      : dispatch(updateWishlist({ name, eventId, id: wishlist?.id }));
    onSubmitProps.setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={FormEmptyState}
        validationSchema={schemaFormWishList}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="grid grid-cols-6 gap-6" noValidate>
            {/* Dpi */}
            <div className="col-span-6">
              <MyTextInput
                name="name"
                label="Nombre de la lista"
                type="text"
                col="col-span-6"
                autoComplete="off"
              />
            </div>
            {/* Departamento */}
            <MySelect name="eventId" label="Evento" col="col-span-6">
              <option value="">Seleccione un Evento</option>
              {events.map(({ id, name, status }: Events) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </MySelect>
            <div className="py-4 text-center col-span-6">
              <ButtonSubmit
                isLoading={loading}
                type="submit"
                isValid={isValid}
                isSubmitting={isSubmitting}
                descriptionButton={
                  isMethod === MethodWishlist.CREATE
                    ? 'Crear una lista'
                    : 'Guardar cambios'
                }
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
