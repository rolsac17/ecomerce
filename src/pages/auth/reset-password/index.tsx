import AuhtLayout from 'layouts/AuhtLayout';
import ResetForm from './components/ResetForm';

const RegisterPage = () => {
  return (
    <AuhtLayout
      title={'Resetear tu contraseña'}
      pageDescription="Pagina de reseteo de contraseña de usuarios"
    >
      <ResetForm />
    </AuhtLayout>
  );
};

export default RegisterPage;
