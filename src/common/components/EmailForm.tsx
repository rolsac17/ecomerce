import { Formik, Form } from 'formik';
import validationSchemaEmail from '../models/validationSchemaEmail';
import { MyTextInput, ButtonSubmit, ButtonBack } from '@common/index';
import {
  IFormRegister,
  useDispatchRegister,
  useRegister,
} from '../../pages/auth/register/context/RegisterContext';

const EmailForm = () => {
  const { formRegister } = useRegister();
  const { next, previous, sendOtp } = useDispatchRegister();

  const handleSubmit = (values: IFormRegister) => {
    next(values);
    sendOtp(values).then(({ hasError, message }) => {});
  };
  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Ingrese su dirección de correo electrónico
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Lo necesitará para iniciar sesión y acceder a su cuenta
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={{
              ...formRegister,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaEmail}
          >
            {({ isValid, dirty, isSubmitting, values }) => (
              <Form className="space-y-6">
                {/* Email */}
                <MyTextInput
                  label="Email"
                  name="email"
                  placeholder="example@gmail.com"
                  type="email"
                />
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

export default EmailForm;
