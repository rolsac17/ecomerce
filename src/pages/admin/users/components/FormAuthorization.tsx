/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { StarIcon, TrashIcon } from '@heroicons/react/solid';
import { MyTextInput } from '@common/MyTextInput';
import * as Yup from 'yup';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  validateYupSchema,
  yupToFormErrors,
} from 'formik';
import { ButtonSubmit } from '@common/ButtonSubmit';
import { MySelect } from '@common/MySelect';
import endPoints from '@services/api';
import {
  useDispatchRegister,
  useRegister,
} from '@pages/auth/register/context/RegisterContext';
import { useStatesByCountry } from '@hooks/useStatesByCountry';
import { useCountries } from '@hooks/useCountries';
import { useCitiesByState } from '@hooks/useCitiesByState';
import validationSchemaVerifyEmail from '@common/models/validationSchemaVerifyEmail';
import validationSchemaClient from '@common/models/validationSchemaClient';
import validationSchemaEmail from '@common/models/validationSchemaEmail';
import { DatePicker } from '@common/DatePicker';
import { validationSchemaSeller } from '@common/models/validationSchemaSeller';
import { useGetUsers } from '@hooks/useGetUsers';
import next from 'next';
import getSessionStorage from 'utils/get-session-storage';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';

export default function FormAuthorization({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { user } = useAppSelector(selectAuth);
  const [idState, setIdState] = useState<string>('');
  const { countries } = useCountries(endPoints.address.getCountries);
  const { states } = useStatesByCountry(
    endPoints.address.getStateByCountry('1')
  );
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { signup, sendOtp } = useDispatchRegister();

  const handleSubmitSignup = (values: any, onSubmitProps: any) => {
    signup(values).then(({ hasError, message }) => {
      setError(hasError);
      setMessage(message);

      if (!hasError) {
        next(values);
      }
    });
    onSubmitProps.setSubmitting(false);
  };
  const [step, setStep] = useState(1);

  const { cities } = useCitiesByState(
    idState,
    endPoints.address.getCitiesByState(idState)
  );

  const handleCitiesByStateChange = (idState: string) => {
    setIdState(idState);
  };

  const getUsuarios = () => {
    let type: string = 'ADMINISTRATOR';
    let status: string = 'ACTIVE';
    let offset: number = 0;
    let limit: number = 100;
    if (user !== null) {
      fetch(endPoints.users.getUsers(type, status, offset, limit), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            // setUserss(dat.content);
          }
        });
    }
  };

  const authorization = (values: any) => {
    values.citiesId = parseInt(values.citiesId);
    if (user !== null) {
      fetch(`${endPoints.wharehouses.authorize}`, {
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
          if (dat.code === 'SUCCESSFUL_OPERATION') {
            getUsuarios();
            setMessage('');
            setOpen(false);
          } else {
            setMessage(dat.message);
          }
        });
    }
  };

  return (
    <>
      <Transition.Root show={open == true ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-4xl md:px-4 md:my-8 md:align-middle lg:max-w-6xl">
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Formik
                    initialValues={{
                      dpi: '',
                      name: '',
                      surnames: '',
                      birthDate: '1991-07-29T16:21:21.269Z',
                      cellPhone: '',
                      phone: '',
                      referenceAddress: '',
                      citiesId: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    onSubmit={(values: any) => {
                      saveOrUpdate(values);
                    }}
                    validationSchema={Yup.object({
                      dpi: Yup.string()
                        .min(13, 'Longitud mínima 13 caracteres')
                        .max(13, 'Longitud máxima 13 caracteres')
                        .matches(/^(\d)+$/, 'Solo debe contener números'),
                      name: Yup.string()
                        .required('Requerido')
                        .min(2, 'Debe ser mayor a 3 caracteres')
                        .max(45, 'Longitud máxima 45 caracteres')
                        .matches(
                          /([A-Z])\w+/,
                          'Solo debe contener letras y una letra mayúscula M'
                        ),
                      surnames: Yup.string()
                        .required('Requerido')
                        .min(2, 'Debe ser mayor a 3 caracteres')
                        .max(45, 'Longitud máxima 45 caracteres')
                        .matches(
                          /[A-Z]/,
                          'Solo debe contener letras y una letra mayúscula M'
                        ),
                      birthDate: Yup.string().required('Requerido'),
                      cellPhone: Yup.string()
                        .required('Requerido')
                        .min(8, 'Longitud mínima 8 caracteres')
                        .max(8, 'Longitud máxima 8 caracteres')
                        .matches(/^(\d)+$/, 'Solo debe contener números'),
                      phone: Yup.string()
                        .min(8, 'Longitud mínima 8 caracteres')
                        .max(8, 'Longitud máxima 8 caracteres')
                        .matches(/^(\d)+$/, 'Solo debe contener números'),
                      referenceAddress: Yup.string().required('Requerido'),
                      country: Yup.string().required('Requerido'),
                      stateId: Yup.string().required('Requerido'),
                      citiesId: Yup.string().required('Requerido'),
                      email: Yup.string()
                        .required('Requerido')
                        .email('Ingrese un formato de correo valido'),
                      password: Yup.string()
                        .required('Requerido')
                        .min(6, 'No debe ser menor a 6 caracteres')
                        .max(20, 'Longitud máxima 20 caracteres'),
                      confirmPassword: Yup.string().when('password', {
                        is: (val: string) =>
                          val && val.length > 0 ? true : false,
                        then: Yup.string().oneOf(
                          [Yup.ref('password')],
                          'Ambas contraseñas deben ser iguales'
                        ),
                      }),
                    })}
                  >
                    {({ handleChange, isValid, isSubmitting, values }) => (
                      <Form className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12  lg:gap-x-8">
                        <div className="sm:col-span-12 w-full">
                          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Datos del Usuario
                          </h1>
                          <p className="mt-2 text-sm text-gray-500">
                            Agrega los datos correspondientes al usuario
                          </p>
                        </div>
                        {/* Nombre */}
                        <MyTextInput
                          name="dpi"
                          label="DPI"
                          type="text"
                          col="col-span-6 "
                        />
                        <div className="col-span-6">&nbsp;</div>
                        <MyTextInput
                          name="name"
                          label="Nombre"
                          type="text"
                          col="col-span-6 "
                        />
                        {/* Apellido */}
                        <MyTextInput
                          name="surnames"
                          label="Apellidos"
                          type="text"
                          col="col-span-6 "
                        />
                        <div className="col-span-4">
                          <div className="grid grid-cols-6 gap-6">
                            <DatePicker
                              name="birthDate"
                              label="Fecha de Nacimiento"
                              type="date"
                              col="col-span-12 md:col-span-12"
                              autoComplete="none"
                            />
                          </div>
                        </div>
                        {/* Celular */}
                        <MyTextInput
                          name="cellPhone"
                          label="Celular"
                          type="text"
                          col="col-span-4"
                        />
                        {/* Telefono */}
                        <MyTextInput
                          name="phone"
                          label="Teléfono"
                          type="text"
                          col="col-span-4 "
                          optional="Opcional"
                        />
                        {/* Direccion del vendedor */}
                        <MyTextInput
                          name="referenceAddress"
                          label="Dirección"
                          col="col-span-12"
                        />
                        {/* Pais */}
                        <div className="hidden">
                          <MySelect
                            name="country"
                            label="País"
                            col="col-span-6 "
                          >
                            <option value="">Seleccione el País</option>
                            {countries.map(
                              ({ id, name }: { id: any; name: any }) => (
                                <option key={id} value={id}>
                                  {name}
                                </option>
                              )
                            )}
                          </MySelect>
                        </div>
                        {/* Departamento */}
                        <MySelect
                          name="stateId"
                          label="Departamento"
                          col="col-span-6 "
                          onChange={(e: any) => {
                            handleChange(e);
                            handleCitiesByStateChange(e.target.value);
                          }}
                        >
                          <option value="">Selecciona Departamento</option>
                          {states.map(
                            ({ id, name }: { id: any; name: any }) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            )
                          )}
                        </MySelect>

                        {/* Municipio */}
                        <MySelect
                          name="citiesId"
                          label="Municipio"
                          col="col-span-6 "
                        >
                          <option value="">Selecciona Municipio</option>
                          {cities.map(
                            ({ id, name }: { id: any; name: any }) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            )
                          )}
                        </MySelect>
                        {/* Email */}
                        <MyTextInput
                          label="Email"
                          name="email"
                          placeholder="example@gmail.com"
                          type="email"
                          col="col-span-12 "
                        />
                        {/* passwords */}
                        <MyTextInput
                          autoComplete="off"
                          label="Contraseña"
                          name="password"
                          placeholder="********"
                          type="password"
                          col="col-span-6"
                        />
                        {/* confirm password */}
                        <MyTextInput
                          autoComplete="off"
                          label="Confirmar Contraseña"
                          name="confirmPassword"
                          placeholder="********"
                          type="password"
                          col="col-span-6"
                        />
                        {message && (
                          <div className="py-4 bg-red-300 text-center col-span-12">
                            <p className="text-red-700">{message}</p>
                          </div>
                        )}
                        <div className="py-1 text-center col-span-12">
                          <button
                            type="submit"
                            className="text-center  w-full h-16 rounded-lg font-semibold bg-cblue-500 text-white hover:bg-cblue-100 hover:text-white"
                          >
                            Guardar
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
function saveOrUpdate(values: any) {
  throw new Error('Function not implemented.');
}
