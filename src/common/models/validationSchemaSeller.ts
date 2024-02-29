import * as Yup from 'yup';

export const validationSchemaSeller = Yup.object({
  dpi: Yup.string()
    .required('Requerido')
    .min(13, 'Longitud minima 13 caracteres')
    .max(13, 'Longitud máxima 13 caracteres')
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
  birthDate: Yup.string().required('Requerido'),
  cellPhone: Yup.string()
    .required('Requerido')
    .min(8, 'Longitud minima 8 caracteres')
    .max(8, 'Longitud máxima 8 caracteres')
    .matches(/^(\d)+$/, 'Solo debe contener números'),
  phone: Yup.string()
    .min(8, 'Longitud minima 8 caracteres')
    .max(8, 'Longitud máxima 8 caracteres')
    .matches(/^(\d)+$/, 'Solo debe contener números'),
  referenceAddress: Yup.string().required('Requerido'),
  country: Yup.string().required('Requerido'),
  stateId: Yup.string().required('Requerido'),
  citiesId: Yup.string().required('Requerido'),
});

export default validationSchemaSeller;
