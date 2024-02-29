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

export default function FormUser({
  open,
  setOpen,
  setUserss,
  setActive,
  active,
  type,
  setShow,
  setMessage,
  message,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setUserss: any;
  setActive: any;
  active: any;
  type: any;
  setShow: any;
  setMessage: any;
  message: any;
}) {
  //disabled button to submit data
  const { user } = useAppSelector(selectAuth);
  const [disabled, setDisabled] = useState(false);
  const { formRegister } = useRegister();
  const [idState, setIdState] = useState<string>('');
  const { countries } = useCountries(endPoints.address.getCountries);
  const { states } = useStatesByCountry(
    endPoints.address.getStateByCountry('1')
  );
  const [error, setError] = useState(false);
  const { signup, sendOtp } = useDispatchRegister();
  const [hide, setHide] = useState(false);

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
  const [id, setId] = useState(0);

  const { cities } = useCitiesByState(
    idState,
    endPoints.address.getCitiesByState(idState)
  );

  const handleCitiesByStateChange = (idState: string) => {
    setIdState(idState);
  };

  const getUsuarios = () => {
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
            setUserss(dat.content);
          }
        });
    }
  };

  const saveOrUpdate = (values: any) => {
    values.citiesId = parseInt(values.citiesId);
    if (user !== null) {
      fetch(
        id > 0 ? `${endPoints.users.update(id)}` : `${endPoints.users.save}`,
        {
          method: id > 0 ? 'PUT' : 'POST',
          headers: {
            'Authorization': 'Bearer ' + user.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.code === 'SUCCESSFUL_OPERATION') {
            getUsuarios();
            setMessage('El usuario fue almacenado exitosamente!');
            setOpen(false);
            setDisabled(false);
            setShow(true);
          } else {
            let msg = dat.message;
            console.log(msg);
            if (msg.includes("email")) {
              setMessage('El correo ya existe');
            } else {
              setMessage(msg);
            }
            setError(true);
          }
        })
        .catch((error) => {
          let msg = error.message;
          console.log(msg);
          if (msg.includes("email")) {
            setMessage('El correo ya existe');
          } else {
            setMessage(msg);
          }
          setError(true);
        });
    }
  };

  useEffect(() => {
    if (active.city) {
      setHide(true);
      setId(active.contactId);
      setError(false);
    } else {
      setHide(false);
      setId(0);
      setError(false);
    }
  }, [active]);

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
                      dpi: active ? active.dpi : '',
                      name: active ? active.name : '',
                      surnames: active ? active.surnames : '',
                      birthDate: active
                        ? active.birthDate
                        : '1991-07-29T16:21:21.269Z',
                      cellPhone: active ? active.cellPhone : '',
                      phone: active ? active.phone : '',
                      referenceAddress: active ? active.referenceAddress : '',
                      CitiesId: active ? 150 : '',
                      email: active ? active.email : '',
                      password: active ? active.password : '',
                      confirmPassword: '',
                    }}
                    onSubmit={(values) => {
                      setDisabled(true);
                      saveOrUpdate(values);
                    }}
                    validationSchema={Yup.object({
                      dpi: Yup.string()
                        .min(13, 'Longitud minima 13 caracteres')
                        .max(13, 'El campo no debe ser mayor de 13 caracteres')
                        .matches(/^(\d)+$/, 'Solo debe contener numeros'),
                      name: Yup.string()
                        .required('Requerido')
                        .min(2, 'Debe ser mayor a 3 caracteres')
                        .max(45, 'Longitud maxima 45 caracteres'),
                      surnames: Yup.string()
                        .required('Requerido')
                        .min(2, 'Debe ser mayor a 3 caracteres')
                        .max(45, 'Longitud maxima 45 caracteres'),
                      birthDate: Yup.string().required('Requerido'),
                      cellPhone: Yup.string()
                        .required('Requerido')
                        .min(8, 'Longitud minima 8 caracteres')
                        .max(8, 'Longitud maxima 8 caracteres')
                        .matches(/^(\d)+$/, 'Solo debe contener numeros'),
                      phone: Yup.string()
                        .min(8, 'Longitud minima 8 caracteres')
                        .max(8, 'Longitud maxima 8 caracteres')
                        .matches(/^(\d)+$/, 'Solo debe contener numeros'),
                      referenceAddress: Yup.string().required('Requerido'),
                      country:
                        hide === false
                          ? Yup.string().required('Requerido')
                          : Yup.string(),
                      stateId:
                        hide === false
                          ? Yup.string().required('Requerido')
                          : Yup.string(),
                      citiesId:
                        hide === false
                          ? Yup.string().required('Requerido')
                          : Yup.string(),
                      email:
                        hide === false
                          ? Yup.string()
                              .required('Requerido')
                              .email('Ingrese un formato de correo valido')
                          : Yup.string(),
                      password:
                        hide === false
                          ? Yup.string()
                              .required('Requerido')
                              .min(6, 'No debe ser menor a 6 caracteres')
                              .max(
                                20,
                                'El campo no debe ser mayor a 20 caracteres'
                              )
                          : Yup.string(),
                      confirmPassword:
                        hide === false
                          ? Yup.string().when('password', {
                              is: (val: string) =>
                                val && val.length > 0 ? true : false,
                              then: Yup.string().oneOf(
                                [Yup.ref('password')],
                                'Ambas contraseñas deben ser iguales'
                              ),
                            })
                          : Yup.string(),
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
                            <option value="">Selecciona País</option>
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
                        {!hide && (
                          <>
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
                          </>
                        )}
                        {hide === false && (
                          <MyTextInput
                            label="Email"
                            name="email"
                            placeholder="example@gmail.com"
                            type="email"
                            col="col-span-12 "
                          />
                        )}

                        {hide === false && (
                          <>
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
                          </>
                        )}
                        {error && (
                          <div className="bg-red-50 text-red-500 p-4 col-span-12">
                            {message}
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
