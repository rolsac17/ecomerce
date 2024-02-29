import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  DatePicker,
  MySelect,
  MyTextInput,
  ButtonSubmit,
  ButtonBack,
} from '@common/index';
import {
  IFormRegister,
  useDispatchRegister,
  useRegister,
} from '../../pages/auth/register/context/RegisterContext';
import endPoints from '@services/api';
import {
  useCountries,
  useStatesByCountry,
  useCitiesByState,
} from '@hooks/index';
import { validationSchemaSeller } from '../models/validationSchemaSeller';
import Link from 'next/link';

const SellerInformationForm = () => {
  const { formRegister } = useRegister();
  const { next, previous } = useDispatchRegister();
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
          Empieza a vender en Weexa
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Más de la mitad de las unidades que se venden en nuestras tiendas
          proceden de vendedores independientes.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={{ ...formRegister }}
            validationSchema={validationSchemaSeller}
            onSubmit={handleSubmit}
          >
            {({ handleChange, isValid, isSubmitting, values }) => (
              <Form className="grid grid-cols-6 gap-6" noValidate>
                {/* Dpi */}
                <div className="col-span-6">
                  <div className="grid grid-cols-6 gap-6">
                    <MyTextInput
                      name="dpi"
                      label="Dpi"
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
                {/* Pais */}
                <div className="hidden">
                  <MySelect
                    name="country"
                    label="Pais"
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
                          className="font-normal text-gray-600 hover:text-sky-600"
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

export default SellerInformationForm;
