import React, { useState } from 'react';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import validationSchemaWarehouse from '../models/validationSchemaWarehouse';
import {
  DatePicker,
  MySelect,
  MyTextInput,
  ButtonSubmit,
  ButtonBack,
} from '@common/index';
import {
  useCountries,
  useStatesByCountry,
  useCitiesByState,
} from '@hooks/index';
import endPoints from '@services/api';
import {
  useDispatchRegister,
  IFormRegister,
  useRegister,
} from '../../pages/auth/register/context/RegisterContext';
import { MyTextArea } from '@common/MyTextArea';

const WarehousesInformationForm = () => {
  const { next, previous } = useDispatchRegister();
  const { formRegister } = useRegister();
  const [idState, setIdState] = useState<string>('');
  const { countries } = useCountries(endPoints.address.getCountries);

  const { states } = useStatesByCountry(
    endPoints.address.getStateByCountry('1')
  );

  const { cities } = useCitiesByState(
    idState,
    endPoints.address.getCitiesByState(idState)
  );

  const handleCitiesByStateChange = (idState: string) => {
    setIdState(idState);
  };

  const handleSubmit = (values: IFormRegister) => {
    next(values);
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ¡Bienvenido! primero ingresa tus datos
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Recuerda que siempre puedes cambiarlos más tarde.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={{ ...formRegister }}
            validationSchema={validationSchemaWarehouse}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, isValid, isSubmitting }) => (
              <Form className="grid grid-cols-6 gap-6" noValidate>
                {/* Nombre almacen */}
                <div className="col-span-6">
                  <div className="grid grid-cols-6 gap-6">
                    <MyTextInput
                      name="warehouseName"
                      label="Nombre del almacén"
                      type="text"
                      col="col-span-6 md:col-span-3"
                      autoComplete="off"
                    />
                  </div>
                </div>
                {/* Nombre */}
                <MyTextInput
                  name="name"
                  label="Nombre"
                  type="text"
                  col="col-span-6 md:col-span-3"
                  autoComplete="off"
                />
                {/* Apellido */}
                <MyTextInput
                  name="surnames"
                  label="Apellidos"
                  type="text"
                  col="col-span-6 md:col-span-3"
                  autoComplete="off"
                />
                {/* date */}
                <div className="col-span-6">
                  <div className="grid grid-cols-6 gap-6">
                    <MyTextInput
                      name="birthDate"
                      label="Fecha de Nacimiento"
                      type="date"
                      col="col-span-6 md:col-span-3"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Celular */}
                <MyTextInput
                  name="cellPhone"
                  label="Celular"
                  type="text"
                  col="col-span-6 md:col-span-3"
                  autoComplete="off"
                />
                {/* Telefono */}
                <MyTextInput
                  name="phone"
                  label="Teléfono"
                  type="text"
                  col="col-span-6 md:col-span-3"
                  optional="Opcional"
                />
                {/* Direccion del vendedor */}
                <MyTextInput
                  name="referenceAddress"
                  label="Dirección"
                  col="col-span-6"
                  autoComplete="off"
                />

                <div className="col-span-6">
                  <span className="block text-sm font-medium text-gray-700 my-2">
                    Su negocio está registrado
                  </span>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <Field
                        type="radio"
                        className="form-radio text-sky-600 focus:ring-sky-500"
                        name="registered"
                        id="registered"
                        value="YES"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Si
                      </span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <Field
                        type="radio"
                        className="form-radio text-sky-600 focus:ring-sky-500"
                        name="registered"
                        id="registered"
                        value="NO"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        No
                      </span>
                    </label>
                  </div>
                </div>

                <div className="col-span-6">
                  <span className="block text-sm font-medium text-gray-700 my-2">
                    ¿Qué tipo de productos vende?
                  </span>
                  <MyTextArea
                    name="productsSell"
                    label="productos"
                    col="col-span-6"
                    autoComplete="off"
                  />
                </div>
                {/* Pais */}
                <div className="hidden">
                  <MySelect
                    name="country"
                    label="País"
                    col="col-span-6 md:col-span-3"
                  >
                    <option value="">Seleccione el País</option>
                    {countries.map(({ id, name }: { id: any; name: any }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </MySelect>
                </div>
                {/* Departamento */}
                <MySelect
                  name="stateId"
                  label="Departamento"
                  col="col-span-6 md:col-span-3"
                  onChange={(e: any) => {
                    handleChange(e);
                    handleCitiesByStateChange(e.target.value);
                  }}
                >
                  <option value="">Seleccione el Departamento</option>
                  {states.map(({ id, name }: { id: any; name: any }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </MySelect>

                {/* Municipio */}
                <MySelect
                  name="citiesId"
                  label="Municipio"
                  col="col-span-6 md:col-span-3"
                >
                  <option value="">Seleccione el Municipio</option>
                  {cities.map(({ id, name }: { id: any; name: any }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </MySelect>
                <div className="col-span-6">
                  <div className="flex items-center">
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      <Link href="/terms">
                        <a
                          target="_blank"
                          className="font-normal text-gray-600 hover:text-blue-600"
                        >
                          Al presionar en <strong>Siguiente</strong> acepta los
                          Términos y Condiciones de Weexa.
                        </a>
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="py-4 text-center col-span-6">
                  <ButtonSubmit
                    type="submit"
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                    descriptionButton="Siguiente"
                  />
                  <ButtonBack type="button" onClick={() => previous(values)} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default WarehousesInformationForm;
