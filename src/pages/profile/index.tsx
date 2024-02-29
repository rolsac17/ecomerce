import { ButtonSubmit } from '@common/ButtonSubmit';
import { MyTextInput } from '@common/MyTextInput';
import { CheckCircleIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { selectProfile, updateProfile } from '@redux/states/Profile';
import { classNames } from '@utils/class-names';
import { Form, Formik } from 'formik';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import * as Yup from 'yup';

const userTypes = {
  ADMINISTRATOR: 'Administrador',
  WAREHOUSE_USER: 'Almacén',
  SELLER_USER: 'Vendedor independiente',
  CLIENT_USER: 'Cliente',
};

export const validationSchemaAddress = Yup.object({
  address: Yup.string().required('Requerido'),
  citiesId: Yup.string().required('Requerido'),
  cellPhone: Yup.string()
    .required('Requerido')
    .min(8, 'Longitud mínima 8 caracteres')
    .max(8, 'Longitud máxima 8 caracteres')
    .matches(/^(\d)+$/, 'Solo debe contener números'),
  phone: Yup.string()
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
  dpi: Yup.string()
    .required('Requerido')
    .min(13, 'Longitud minima 13 caracteres')
    .max(13, 'Longitud máxima 13 caracteres')
    .matches(/^(\d)+$/, 'Solo debe contener números'),
});

interface PropsMessage {
  message: string;
  isError: boolean;
}
export const Message: React.FC<PropsMessage> = ({ message, isError }) => {
  return (
    <div
      className={classNames(
        isError ? ' bg-red-50' : ' bg-green-50',
        'rounded-md p-4'
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {isError ? (
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          ) : (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <p
            className={classNames(
              isError ? 'text-red-700' : 'text-green-800',
              'text-sm font-medium'
            )}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const { isLoading, message, error, success } = useAppSelector(selectProfile);
  const { user, currentUser } = useAppSelector(selectAuth);

  const onSubmitUpdateProfile = ({
    email,
    dpi,
    name,
    surnames,
    cellPhone,
    phone,
    address,
    citiesId,
  }: any) => {
    const profile = {
      email,
      dpi,
      name,
      surnames,
      birthDate: '1991-07-29T16:21:21.269Z',
      cellPhone,
      phone,
      address,
      citiesId,
    };
    dispatch(updateProfile(profile));
  };

  return (
    <LayoutShopSimple
      title="La tienda oficial Weexa | Profile"
      pageDescription="La tienda oficial de Weexa. Envíos gratis en miles de productos. Consigue lo mejor en compras y entretenimiento con Weexa. Disfruta de precios bajos y grandes ofertas en la mayor selección de artículos básicos para el día a día y otros productos, incluyendo moda, hogar, belleza, electrónica, dispositivos Alexa, artículos deportivos, juguetes, automóvil, mascotas, bebé, libros, videojuegos, instrumentos musicales, material de oficina y mucho más."
    >
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Mi perfil</h2>
        {(success || error) && <Message message={message} isError={error} />}
        <Formik
          initialValues={{
            address: currentUser.referenceAddress,
            country: currentUser.countryId,
            stateId: currentUser.stateId,
            citiesId: currentUser.cityId,
            cellPhone: currentUser.cellPhone,
            phone: currentUser.phone,
            name: currentUser.name,
            surnames: currentUser.surnames,
            email: currentUser.email,
            dpi: currentUser.dpi,
            userType: userTypes[user.type],
          }}
          validationSchema={validationSchemaAddress}
          onSubmit={(values) => {
            onSubmitUpdateProfile(values);
          }}
        >
          {({ handleChange, isValid, isSubmitting, values }) => (
            <Form className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Tus Datos
                </h3>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-6 gap-6">
                  <MyTextInput
                    style={{ cursor: 'not-allowed', background: '#d1d5db' }}
                    disabled
                    name="userType"
                    label="Tipo de cuenta"
                    type="text"
                    col="col-span-6 md:col-span-3"
                  />
                </div>
              </div>
              <MyTextInput
                name="name"
                label="Nombre"
                type="text"
                col="col-span-6 md:col-span-3"
              />
              <MyTextInput
                name="surnames"
                label="Apellido"
                type="text"
                col="col-span-6 md:col-span-3"
              />
              <MyTextInput
                name="email"
                label="Correo electrónico"
                type="text"
                col="col-span-6 md:col-span-3"
              />
              <MyTextInput
                name="dpi"
                label="Dpi"
                type="text"
                col="col-span-6 md:col-span-3"
                autoComplete="off"
              />
              <div className="col-span-6">
                <div className="grid grid-cols-6 gap-6">
                  <MyTextInput
                    name="cellPhone"
                    label="Celular"
                    type="text"
                    col="col-span-6 md:col-span-2"
                  />
                  <MyTextInput
                    name="phone"
                    label="Teléfono"
                    type="text"
                    col="col-span-6 md:col-span-2"
                  />
                </div>
              </div>
              <MyTextInput
                name="address"
                label="Dirección"
                type="text"
                col="col-span-6"
              />
              <div className="py-4 text-center col-span-2">
                <ButtonSubmit
                  isLoading={isLoading}
                  type="submit"
                  isValid={isValid}
                  descriptionButton="Guardar cambios"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </LayoutShopSimple>
  );
};

export default Profile;
