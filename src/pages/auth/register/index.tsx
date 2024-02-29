import  AuhtLayout  from 'layouts/AuhtLayout';
import FormContainer from '../../../common/components/FormContainer';
import  RegisterProvider, { useRegister } from './context/RegisterContext';

const RegisterPage = () => {
  return (
    <RegisterProvider>
      <AuhtLayout
        title={'Create Account'}
        pageDescription='Pagina de Registro para Almacenes, Vendedores'
      >
        <FormContainer />
      </AuhtLayout>
    </RegisterProvider>
  );
};

export default RegisterPage;
