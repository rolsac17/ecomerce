import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
  password: Yup.string()
    .required('Requerido')
    .min(6, 'No debe ser menor a 6 caracteres')
    .max(20, 'Longitud maxica 20 caracteres'),
  email: Yup.string()
    .required('Requerido')
    .email('Ingrese un formato de correo valido'),
});