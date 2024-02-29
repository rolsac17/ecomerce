import React, { useState } from 'react';
import { MyTextInput } from '@common/MyTextInput';
import { ExclamationIcon } from '@heroicons/react/solid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import endPoints from '@services/api';
import { DatePicker } from '@common/DatePicker';
import moment from 'moment';
import getSessionStorage from 'utils/get-session-storage';
import { AnyMap } from 'immer/dist/internal';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';

const FormCoupon = ({
  setShow,
  active,
  name,
  id,
  setOpen,
  getCoupons,
  setMessage,
}: {
  setShow: any;
  active: any;
  name: any;
  id: any;
  setOpen: any;
  getCoupons: any;
  setMessage: any;
}) => {
  const { user } = useAppSelector(selectAuth);
  //to disable the submit button
  const [disabled, setDisabled] = useState(false);

  const saveOrUpdateCoupon = (values: any) => {
    if (user !== null) {
      fetch(`${endPoints.coupons.getCupons}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            getCoupons();
            setOpen(false);
            setDisabled(false);
            setShow(true);
            setMessage('El cupón ha sido almacenado exitosamente!');
          }
        });
    }
  };

  const desactivateCoupon = () => {
    if (user !== null) {
      fetch(`${endPoints.coupons.getCupons}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            getCoupons();
            setOpen(false);
            setShow(true);
            setMessage('El cupón ha sido eliminado exitosamente!');
          }
        });
    }
  };
  return (
    <div>
      {active ? (
        <>
          <div className="z-0 sm:flex sm:items-start">
            <div className="mx-auto z-0 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Desactivar Cupón
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Esta seguro de desactivar el cupón <strong>{name}</strong>,
                  después de realizar esta acción, el cupón ya no podrá ser
                  aplicado en ninguna compra
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 z-0 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => desactivateCoupon()}
            >
              Desactivar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{
            id: id,
            code: name,
            discount: '',
            deadline: moment(),
          }}
          onSubmit={(values) => {
            values.deadline = moment(values.deadline);
            setDisabled(true);
            saveOrUpdateCoupon(values);
          }}
          validationSchema={Yup.object({
            deadline: Yup.date()
              .min(new Date(), "La fecha de vencimiento debe ser mayor  a la fecha actual")
              .required("El campo es requerido"),
            code: Yup.string().min(6, "El campo debe ser mayor a 6 caracteres").required('El campo es requerido'),
            discount: Yup.string().required('El campo es requerido'),
          })}
        >
          {(formik) => (
            <>
              <div className="">
                <div className=" text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Cupones
                  </h3>
                  <div className="">
                    <p className="text-sm text-gray-500">
                      Crea cupones para tus productos.
                    </p>
                  </div>
                </div>
              </div>
              <Form className="z-0 space-y-4 py-5">
                {/* Campo de email */}
                <label className="block text-sm font-medium text-gray-700 text-left">
                  Fecha vencimiento
                </label>
                <DatePicker
                  label=""
                  name="deadline"
                  type="date"
                  col="z-auto col-span-12 text-red-500 md:col-span-12"
                  autoComplete="none"
                />
                <MyTextInput
                  label="Código"
                  name="code"
                  type="text"
                  autoComplete="off"
                />
                <MyTextInput
                  label="Descuento"
                  name="discount"
                  type="number"
                  autoComplete="off"
                />
                {/* Campo de Clave */}
                <div></div>
                {}
                <div className="mt-5 py-6 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    disabled={disabled}
                    type="submit"
                    className="w-full  inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cblue-500 text-base font-medium text-white hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 sm:col-start-2 sm:text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    type="reset"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      )}
    </div>
  );
};

export default FormCoupon;
