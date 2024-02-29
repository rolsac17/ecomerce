import { ButtonSubmit } from '@common/ButtonSubmit';
import { MyTextInput } from '@common/MyTextInput';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectCart } from '@redux/states/cartSlice';
import { isValidCoupon, selectCoupun } from '@redux/states/Coupun';
import { selectOrders } from '@redux/states/Orders/orderSlice';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
  coupon: Yup.string().min(6, 'No debe ser menor a 6 caracteres'),
});

interface DataCoupon {
  coupon: string;
}

export const Cupon = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, message, success } = useAppSelector(selectCoupun);
  const { warehousesId } = useAppSelector(selectOrders);
  const { subTotal, cart } = useAppSelector(selectCart);

  const products = cart.map(({ id, quantity }) => ({
    id,
    quantity,
  }));

  const handleSubmit = ({ coupon }: DataCoupon) => {
    dispatch(isValidCoupon(coupon, warehousesId!, products));
  };

  return (
    <div>
      <Formik
        initialValues={{ coupon: '' }}
        validationSchema={validationSchemaLogin}
        onSubmit={handleSubmit}
      >
        {({ handleChange, isValid, isSubmitting, values }) => (
          <Form className=" mt-4" noValidate>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 md:col-span-4">
                <MyTextInput
                  name="coupon"
                  label="Introduce el codigo de cupon"
                  type="text"
                  col="col-span-6"
                  autoComplete="off"
                />
              </div>
              <div className="pt-0 pb-2 text-center col-span-6 md:col-span-2 md:pb-0 self-end ">
                <ButtonSubmit
                  type="submit"
                  isValid={isValid}
                  // isSubmitting={isSubmitting}
                  descriptionButton="Postular"
                />
              </div>
            </div>
            <div>
              {error && <p className="mt-2 text-sm text-red-600">{message}</p>}
              {success && (
                <p className="flex align-center space-y-2 mt-2 text-sm text-green-600">
                  {message}
                  <CheckCircleIcon className="h-4 w-4 ml-2" />
                </p>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
