import React, { useState } from 'react';
import { MyTextInput } from '@common/MyTextInput';
import { ExclamationIcon } from '@heroicons/react/solid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import endPoints from '@services/api';
import getSessionStorage from 'utils/get-session-storage';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';

const FormTransport = ({
  setShow,
  active,
  name,
  id,
  setOpen,
  getTransports,
  setMessage,
}: {
  setShow: any;
  active: any;
  name: any;
  id: any;
  setOpen: any;
  getTransports: any;
  setMessage: any;
}) => {
  const { user } = useAppSelector(selectAuth);

  //disabled button to submit data
  const [disabled, setDisabled] = useState(false);

  const saveOrUpdateTransport = (values: any) => {
    if (user !== null) {
      fetch(`${endPoints.transports.crud}${id > 0 ? '/' + id : ''}`, {
        method: id == 0 ? 'POST' : 'PUT',
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
            setShow(true);
            getTransports();
            setOpen(false);
            setDisabled(false);
            setMessage('El transporte ha sido almacenado exitosamente!');
          }
        });
    }
  };

  const desactivateTransport = () => {
    if (user !== null) {
      fetch(`${endPoints.transports.crud}/${id}`, {
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
            getTransports();
            setOpen(false);
            setShow(true);
            setMessage('El transporte fue eliminado exitosamente!');
          }
        });
    }
  };
  return (
    <div>
      {active ? (
        <>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Desactivar Transporte
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Esta seguro de desactivar el transporte:{' '}
                  <strong>{name}</strong>, después de realizar esta acción, el
                  transporte desaparecerá de todas las opciones del sistema
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => desactivateTransport()}
            >
              Desactivar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{
            name: name,
          }}
          onSubmit={(values) => {
            setDisabled(true);
            saveOrUpdateTransport(values);
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('El campo es requerido'),
          })}
        >
          {(formik) => (
            <>
              <div className="">
                <div className=" text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Transportes
                  </h3>
                  <div className="">
                    <p className="text-sm text-gray-500">
                      Crea o actualiza tus transportes para el envió de
                      productos
                    </p>
                  </div>
                </div>
              </div>
              <Form className="space-y-14 py-5">
                {/* Campo de email */}
                <MyTextInput
                  label="Nombre"
                  name="name"
                  type="text"
                  autoComplete="off"
                />

                <MyTextInput
                  label="Url"
                  name="url"
                  type="text"
                  autoComplete="off"
                />
                {/* Campo de Clave */}
                <div></div>
                {}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={disabled}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cblue-500 text-base font-medium text-white hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    type="reset"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:col-start-1 sm:text-sm"
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

export default FormTransport;
