import { ButtonSubmit } from '@common/ButtonSubmit';
import { MySelect } from '@common/MySelect';
import { MyTextArea } from '@common/MyTextArea';
import { MyTextInput } from '@common/MyTextInput';
import { CartWrapper } from '@components/ecommerce/cart/cart-wrapper';
import { OrderSummary } from '@components/ecommerce/cart/order-summary';
import { useCitiesByState } from '@hooks/useCitiesByState';
import { useCountries } from '@hooks/useCountries';
import { useStatesByCountry } from '@hooks/useStatesByCountry';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { selectCart, setShoppingAddress } from '@redux/states/cartSlice';
import endPoints from '@services/api';
import { Formik, Form } from 'formik';
import { IShoppingAddress } from 'interfaces/ICart';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

export const validationSchemaAddress = Yup.object({
  shippingAddress: Yup.string().required('Requerido'),
  country: Yup.string().required('Requerido'),
  stateId: Yup.string().required('Requerido'),
  citiesId: Yup.string().required('Requerido'),
  cellPhone: Yup.string()
    .required('Requerido')
    .min(8, 'Longitud mínima 8 caracteres')
    .max(8, 'Longitud máxima 8 caracteres')
    .matches(/^(\d)+$/, 'Solo debe contener números'),
  name: Yup.string()
    .required('Requerido')
    .min(2, 'Debe ser mayor a 3 caracteres')
    .max(45, 'Longitud máxima 45 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 'Solo debe contener letras'),
  surnames: Yup.string()
    .required('Requerido')
    .min(2, 'Debe ser mayor a 3 caracteres')
    .max(45, 'Longitud máxima 45 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 'Solo debe contener letras'),
  email: Yup.string()
    .required('Requerido')
    .email('Ingrese un formato de correo valido'),
  observation: Yup.string().max(255, 'Longitud máxima 255 caracteres'),
});

const AddressPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(selectAuth);
  const { shoppingAddress } = useAppSelector(selectCart);
  const [idState, setIdState] = useState<string>('');
  const { states } = useStatesByCountry(
    endPoints.address.getStateByCountry('1')
  );
  const { countries } = useCountries(endPoints.address.getCountries);

  const { cities } = useCitiesByState(
    idState,
    endPoints.address.getCitiesByState(idState)
  );

  const handleCitiesByStateChange = (idState: string) => {
    setIdState(idState);
  };

  const setValuesAddress = (values: any) => {
    let city = cities.filter(
      ({ id, name }: { id: any; name: any }) => Number(values.citiesId) === id
    );

    let nameCountry = countries.filter(
      ({ id, name }: { id: any; name: any }) => Number(values.country) === id
    );

    let state = states.filter(
      ({ id, name }: { id: any; name: any }) => Number(values.stateId) === id
    );

    const shoppingAddress: IShoppingAddress = {
      shippingAddress: values.shippingAddress,
      cellPhone: values.cellPhone,
      citiesId: values.citiesId,
      country: values.country,
      stateId: values.stateId,
      cityName: city[0]?.name,
      countryName: nameCountry[0]?.name,
      stateName: state[0]?.name,
      name: values.name,
      surnames: values.surnames,
      email: values.email,
      observation: values.observation,
    };
    dispatch(setShoppingAddress(shoppingAddress));
    router.push('/checkout/summary');
  };

  useEffect(() => {
    if (shoppingAddress?.stateId) {
      setIdState(shoppingAddress?.stateId);
    } else {
      setIdState(currentUser.stateId);
    }
  }, [shoppingAddress?.stateId]);

  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | Address"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      <CartWrapper titlePrincipal="Confirma la Dirección de Entrega">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <Formik
            initialValues={{
              shippingAddress: shoppingAddress?.shippingAddress
                ? shoppingAddress?.shippingAddress
                : '',
              country: shoppingAddress?.country
                ? shoppingAddress?.country
                : '1',
              stateId: shoppingAddress?.stateId ? shoppingAddress?.stateId : '',
              citiesId: shoppingAddress?.citiesId
                ? shoppingAddress?.citiesId
                : '',
              cellPhone: shoppingAddress?.cellPhone
                ? shoppingAddress?.cellPhone
                : '',
              name: shoppingAddress?.name ? shoppingAddress?.name : '',
              surnames: shoppingAddress?.surnames
                ? shoppingAddress?.surnames
                : '',
              email: shoppingAddress?.email ? shoppingAddress?.email : '',
              observation: shoppingAddress?.observation
                ? shoppingAddress?.observation
                : '',
            }}
            validationSchema={validationSchemaAddress}
            onSubmit={(values) => {
              setValuesAddress(values);
            }}
          >
            {({ handleChange, isValid, isSubmitting, values }) => (
              <Form className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Datos Personales
                  </h3>
                </div>
                {/* Direccion del vendedor */}
                <MyTextInput
                  name="name"
                  label="Nombre"
                  type="text"
                  col="col-span-6 md:col-span-3"
                />
                {/* Direccion del vendedor */}
                <MyTextInput
                  name="surnames"
                  label="Apellido"
                  type="text"
                  col="col-span-6 md:col-span-3"
                />
                {/* Celular */}
                <MyTextInput
                  name="cellPhone"
                  label="Teléfono"
                  type="text"
                  col="col-span-6 md:col-span-2"
                />
                {/* Direccion del vendedor */}
                <MyTextInput
                  name="email"
                  label="Correo electrónico"
                  type="text"
                  col="col-span-6 md:col-span-4"
                />
                <div className="col-span-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Datos para la entrega
                  </h3>
                </div>
                {/* Direccion del vendedor */}
                <MyTextInput
                  name="shippingAddress"
                  label="Dirección de Entrega"
                  type="text"
                  col="col-span-6"
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
                {/* Observaciones */}
                <MyTextArea
                  name="observation"
                  label="Observaciones"
                  optional="Opcional"
                  col="col-span-6"
                />
                <div className="py-4 text-center col-span-6">
                  <ButtonSubmit
                    type="submit"
                    isValid={isValid}
                    // isSubmitting={isSubmitting}
                    descriptionButton="Continuar"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </section>
        <OrderSummary
          titleButton={'Continuar'}
          onClick={() => {}}
          hiddenButton
        />
      </CartWrapper>
    </LayoutShopSimple>
  );
};

export default AddressPage;
