import * as Yup from 'yup';
const validationSchemaEmail = Yup.object({
  email: Yup.string()
    .required('Requerido')
    .email('Ingrese un formato de correo valido'),
});


export default validationSchemaEmail;