import * as Yup from 'yup';

const validationSchemaVerifyEmail = Yup.object({
  password: Yup.string()
    .required('Requerido')
    .min(6, 'No debe ser menor a 6 caracteres')
    .max(20, 'Longitud máxima 20 caracteres'),
  confirmPassword: Yup.string().when('password', {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Ambas contraseñas deben ser iguales'
    ),
  }),
  otp: Yup.string()
    .required('Requerido')
    .min(6, 'Longitud minima 6 caracteres'),
});

export default validationSchemaVerifyEmail;
