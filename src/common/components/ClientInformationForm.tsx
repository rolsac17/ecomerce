import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import  validationSchemaClient  from '../models/validationSchemaClient';
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

const ClientInformationForm = () => {
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
      <div className='sm:mx-auto sm:w-full sm:max-w-md px-4'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Bienvenido! Ingresa los siguientes datos
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          siempre puedes cambiarlos más tarde
        </p>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-xl'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              ...formRegister,
              birthDate: '1991-07-29T16:21:21.269Z',
            }}
            validationSchema={validationSchemaClient}
            onSubmit={handleSubmit}
          >
            {({ handleChange, isValid, isSubmitting, values }) => (
              <Form className='grid grid-cols-6 gap-6' noValidate>
                {/* Nombre */}
                <MyTextInput
                  name='name'
                  label='Nombre'
                  type='text'
                  col='col-span-6 md:col-span-3'
                />
                {/* Apellido */}
                <MyTextInput
                  name='surnames'
                  label='Apellidos'
                  type='text'
                  col='col-span-6 md:col-span-3'
                />
                {/* Celular */}
                <MyTextInput
                  name='cellPhone'
                  label='Celular'
                  type='text'
                  col='col-span-6 md:col-span-3'
                />
                {/* Telefono */}
                <MyTextInput
                  name='phone'
                  label='Teléfono'
                  type='text'
                  col='col-span-6 md:col-span-3'
                  optional='Opcional'
                />
                {/* Direccion del vendedor */}
                <MyTextInput
                  name='referenceAddress'
                  label='Dirección'
                  col='col-span-6'
                />
                {/* Pais */}
                <div className='hidden'>
                  <MySelect
                    name='country'
                    label='Pais'
                    col='col-span-6 md:col-span-3'
                  >
                    <option value=''>Seleccione el Pais</option>
                    {countries.map(({ id, name }: { id: any; name: any }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </MySelect>
                </div>
                {/* Departamento */}
                <MySelect
                  name='stateId'
                  label='Departamento'
                  col='col-span-6 md:col-span-3'
                  onChange={(e: any) => {
                    handleChange(e);
                    handleCitiesByStateChange(e.target.value);
                  }}
                >
                  <option value=''>Seleccione el Departamento</option>
                  {states.map(({ id, name }: { id: any; name: any }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </MySelect>

                {/* Municipio */}
                <MySelect
                  name='citiesId'
                  label='Municipio'
                  col='col-span-6 md:col-span-3'
                >
                  <option value=''>Seleccione el Municipio</option>
                  {cities.map(({ id, name }: { id: any; name: any }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </MySelect>
                <div className='py-4 text-center col-span-6'>
                  <ButtonSubmit
                    type='submit'
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                    descriptionButton='Siguiente'
                  />
                  <ButtonBack type='button' onClick={() => previous(values)} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};


export default ClientInformationForm;