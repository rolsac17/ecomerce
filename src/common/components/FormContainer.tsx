import { useRegister } from '../../pages/auth/register/context/RegisterContext';
import AccountType from './AccountType';
import ConfirmExit from './ConfirmExit';
import ConfirmExitWarehouse from './ConfirmExitWarehouse';
import EmailForm from './EmailForm';
import SellerInformationForm from './SellerInformationForm';
import VerifyEmailPasswordForm from './VerifyEmailPasswordForm';
import WarehousesInformationForm from './WarehousesInformationForm';

const FormContainer = () => {
  const { steps, formRegister } = useRegister();
  const { type: typeRegister } = formRegister;

  return (
    <>
      {steps === 0 && <AccountType />}
      {steps === 1 && (
        <>
          {typeRegister === 'WAREHOUSE_USER' && <WarehousesInformationForm />}
          {typeRegister === 'SELLER_USER' && <SellerInformationForm />}
        </>
      )}
      {steps === 2 && <EmailForm />}
      {steps === 3 && <VerifyEmailPasswordForm />}
      {steps === 4 && (
        <>
          {typeRegister === 'WAREHOUSE_USER' && <ConfirmExitWarehouse />}
          {typeRegister === 'SELLER_USER' && <ConfirmExit />}
        </>
      )}
    </>
  );
};

export default FormContainer;
