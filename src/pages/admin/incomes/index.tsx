import AdminLayout from 'layouts/AdminLayout';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ExclamationIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Tab } from '@headlessui/react';
import { AtSymbolIcon, CodeIcon, LinkIcon } from '@heroicons/react/solid';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { MyTextInput } from '@common/MyTextInput';
import Modal from '@components/Modal';
import endPoints from '@services/api';
import Cards from './components/Cards';
import ProductDetail from './components/ProductDetail';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { sendData } from '../../../helpers/sendData';
import { fetchData } from '../../../helpers/fetchData';
import { Form, Formik, validateYupSchema, yupToFormErrors } from 'formik';
import { MyTextArea } from '@common/MyTextArea';
import { MySelect } from '@common/MySelect';
import { classNames } from '@utils/class-names';
import Notifications from '@common/Notifications';
import { selectAuth } from '@redux/states/Auth';
import FormError from '@common/FormError';

const Incomes = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [tabSelected, setTabSelected] = useState(1);
  const [incomeId, setIncomeId] = useState(0);
  const [incomeComment, setIncomeComment] = useState('');
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState({});
  const [warehousesId, setWarehousesId] = useState(0);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [submit, doSubmit] = useState(false);
  const [showErrorForm, setShowErrorForm] = useState(false)
  const [id, setId] = useState('');

  const addIncome = (income: any) => {
    let c = income.comment;
    sendData({
      method: 'POST',
      endpoint: '/warehouse/income',
      body: income,
    })
      .then((data) => {
        setIncomeId(data.content.incomeId);
        setIncomeComment(c);
        setTabSelected(1);
        setOpen(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getWarehouses = () => {
    setWarehouses([]);
    const endpoint = '/warehouse/warehouses';
    fetchData({ endpoint })
      .then((data) => {
        if (data.content) {
          setWarehouses(data.content);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  useEffect(() => {
    const values = {
      warehousesId: id,
      comment: 'Ingreso de mercadería',
    };
    warehouses.forEach((w) => {
      setWarehousesId(w.id);
      values.warehousesId = w.id;
    });

    // if (warehouses.length > 0) addIncome(values);
  }, [warehouses.length > 0]);

  const dispatch = useAppDispatch();

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="mx-4 mt-5 rounded-2xl border border-gray-100 shadow-md  bg-gray-100 border-rounded  h-auto px-1   ring-gray-100 sm:-mx-6 md:mx-0 md:rounded-lg">
            <div>
              <div className="">
                <div className="bg-white w-full h-auto border-slate-50 p-5  border-rounded ">
                  <Tab.Group selectedIndex={tabSelected}>
                    {({ selectedIndex }) => (
                      <>
                        <Tab.List className="flex items-center">
                          <Tab
                            hidden
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                                  : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
                                'px-3 py-1.5 border border-transparent text-sm font-medium rounded-md'
                              )
                            }
                          ></Tab>
                          <Tab
                            hidden
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                                  : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
                                'ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md'
                              )
                            }
                          ></Tab>

                          {/* These buttons are here simply as examples and don't actually do anything. */}
                          {selectedIndex === 0 ? (
                            <div className="ml-auto flex items-center py-6">
                              <div className="flex items-center"></div>
                            </div>
                          ) : null}
                        </Tab.List>
                        <Tab.Panels className="mt-2 px-10">
                          <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                            <Formik
                              initialValues={{
                                warehousesId: id,
                                comment: 'Ingreso de mercadería',
                              }}
                              onSubmit={(values: any) => {
                                if (warehouses.length > 1) {
                                  setWarehousesId(values.warehousesId);
                                } else {
                                  warehouses.forEach((w) => {
                                    setWarehousesId(w.id);
                                    values.warehousesId = w.id;
                                  });
                                }
                                addIncome(values);
                              }}
                              validationSchema={Yup.object({
                                comment: Yup.string()
                                  .required('El campo es requerido')
                                  .min(12, 'Debe ser mayor a 12 caracteres')
                                  .max(250, 'Longitud maxica 250 caracteres'),
                              })}
                            >
                              {(formik) => (
                                <>
                                  {/* <div className="max-w-xl">
                                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                      Ingreso de productos!
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-500">
                                      Comentario de ingreso de productos (este
                                      se enviara via correo electronico a los
                                      vendedores)...
                                    </p>
                                  </div> */}
                                  <Form className="space-y-5 py-5">
                                    {warehouses.length > 1 && (
                                      <MySelect
                                        name="warehousesId"
                                        id="warehousesId"
                                        className=" border-gray-300 focus:outline-none focus:ring-cblue-500 focus:border-cblue-500 mt-1 block text-base sm:text-sm rounded-md"
                                        label={''}
                                      >
                                        <option value="">
                                          Seleccione un almacén
                                        </option>
                                        {warehouses.map(
                                          ({
                                            id,
                                            name,
                                          }: {
                                            id: any;
                                            name: any;
                                          }) => (
                                            <option key={id} value={id}>
                                              {name}
                                            </option>
                                          )
                                        )}
                                      </MySelect>
                                    )}
                                    {/* Campo de email */}

                                    {/* <MyTextArea
                                      rows={8}
                                      name="comment"
                                      autoComplete="off"
                                      placeholder="Comentario..."
                                    /> */}
                                    {/* Campo de Clave */}
                                    <div></div>
                                    {submit && formik.submitForm()}
                                    <div className="flex justify-end">
                                      {' '}
                                      {/* <button
                                        type="button"
                                        className="inline-flex items-center px-4 mx-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-500 bg-gray-100 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500"
                                      >
                                        Cancelar
                                      </button>
                                      <button
                                        type="submit"
                                        className="inline-flex items-center px-4  py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cblue-500 hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500"
                                      >
                                        Continuar
                                      </button> */}
                                    </div>
                                  </Form>
                                </>
                              )}
                            </Formik>
                          </Tab.Panel>
                          <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                            <div className="border-b">
                              <div className="p-2">
                                <div className="max-w-xl">
                                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                    Ingreso de Productos
                                  </h1>
                                  <p className="mt-2 text-sm text-gray-500">
                                    {incomeComment}
                                  </p>
                                </div>
                                <Cards
                                  income={income}
                                  open={open}
                                  setIncome={setIncome}
                                  incomeId={incomeId}
                                  warehousesId={warehousesId}
                                  setOpen={setOpen}
                                  setShow={setShow}
                                  setMessage={setMessage}
                                  addIncome={addIncome}
                                  warehouses={warehouses}
                                  setWarehousesId={setWarehousesId}
                                  setShowErrorForm={setShowErrorForm}
                                />
                                <div className="w-full">
                                  <button
                                    onClick={() => {
                                      window.location.reload();
                                    }}
                                    className=" px-4 w-full text-center   py-4 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-cblue-50 hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 hover:text-white"
                                  >
                                    Finalizar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </>
                    )}
                  </Tab.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /End r eplace */}

        <Notifications message={message} show={show} setShow={setShow} />
      </div>
    </AdminLayout>
  );
};

export default Incomes;
