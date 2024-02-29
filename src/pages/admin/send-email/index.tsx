import { MySelect } from '@common/MySelect';
import { MyTextArea } from '@common/MyTextArea';
import { MyTextInput } from '@common/MyTextInput';
import Notifications from '@common/Notifications';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';
import getSessionStorage from '@utils/get-session-storage';
import { Form, Formik } from 'formik';
import AdminLayout from 'layouts/AdminLayout';
import React, { useState } from 'react';
import * as Yup from 'yup';

export default function SendEmail(values: any) {
  const { user } = useAppSelector(selectAuth);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const send = (values: any) => {
    if (user !== null) {
      fetch(`${endPoints.email.send}`, {
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
            setMessage('El email ha sido enviado exitosamente!');
            setDisabled(false);
            setShow(true);
          }
        });
    }
  };

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="py-10 px-6 bg-white my-10  shadow-2xl shadow-gray-200 sm:px-10 lg:col-span-2 xl:p-12">
        <Formik
          initialValues={{
            userType: '',
            subject: '',
            message: '',
          }}
          onSubmit={(values: any) => {
            values.userType = parseInt(values.userType);
            setDisabled(true);
            send(values);
            values.userType = '';
            values.subject = '';
            values.message = '';
          }}
          validationSchema={Yup.object({
            // dpi: Yup.string()
            //   .min(13, "Longitud minima 13 caracteres")
            //   .max(13, "Longitud maxica 13 caracteres")
            //   .matches(/^(\d)+$/, "Solo debe contener numeros"),
          })}
        >
          {({ handleChange }) => (
            <Form className="w-full grid grid-cols-1 gap-y-5 gap-x-6 items-start sm:grid-cols-12  lg:gap-x-8">
              <div className="col-span-12 w-full">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Notificar a usuarios
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Envia un email a cualquier segmento de usuarios ya se
                  almacenes, venedores o clientes.
                </p>
              </div>
              {/* Nombre */}
              <MySelect name="userType" label="Usuarios" col="col-span-6 ">
                <option value="">Seleccione el tipo de usuario</option>
                <option value="2">Almacenes</option>
                <option value="3">Vendedores</option>
                <option value="4">Clientes</option>
              </MySelect>
              <div className="col-span-6">&nbsp;</div>

              {/* Direccion del vendedor */}
              <MyTextInput name="subject" label="Asunto" col="col-span-12" />

              {/* Pais */}
              <MyTextArea
                name="message"
                placeholder="Mensaje..."
                label="Mensaje"
                rows={10}
                col="col-span-12"
              />

              <div className="py-1 text-center col-span-12">
                <button
                  type="submit"
                  disabled={disabled}
                  className="text-center  w-full h-12 rounded-lg font-semibold bg-cblue-500 text-white hover:bg-cblue-100 hover:text-white"
                >
                  Enviar
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Notifications message={message} show={show} setShow={setShow} />
      </div>
    </AdminLayout>
  );
}
