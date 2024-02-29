/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { StarIcon, TrashIcon } from '@heroicons/react/solid';
import { MyTextInput } from '@common/MyTextInput';
import * as Yup from 'yup';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useFormik,
  validateYupSchema,
  yupToFormErrors,
} from 'formik';
import { MySelect } from '@common/MySelect';
import endPoints from '@services/api';
import { MyTextArea } from '@common/MyTextArea';
import { sendData } from 'helpers/sendData';
import { changeIncomeForm } from '@redux/states/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubCategories,
  setSubCategories,
} from '@redux/states/subcategoriesSlice';
import {
  activeProduct,
  addLabels,
  deleteLabel,
} from '@redux/states/incomeSlice';
import { fetchData } from 'helpers/fetchData';
import moment from 'moment';
import { actions } from 'react-table';
import getSessionStorage from 'utils/get-session-storage';
import Image from 'next/image';
import { selectAuth } from '@redux/states/Auth';
import { useAppSelector } from '@redux/app/hooks';

export default function OrderDetail({
  open,
  setOpen,
  active,
  getOrders,
  warehouseId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  active: any;
  getOrders: any;
  warehouseId: any;
}) {
  const { user } = useAppSelector(selectAuth);
  const [showSend, setShowSend] = useState(false);
  const [show, setShow] = useState(false);
  const [guide, setGuide] = useState('');
  const [transport, setTransport] = useState<any>();
  const [change, setChange] = useState(false);

  const [products, setProducts] = useState([]);

  const [checked, setChecked] = useState<any[]>([]);
  const [transports, setTransports] = useState([]);

  const handleCheck = (a: any, event: any) => {
    console.log(a)
    const { quantity, discountRate, price, product, costOfShipping } = a;
    const { id } = product;
    let updateList = [
      ...checked,
      {
        quantity: quantity,
        discount: parseFloat(discountRate.toFixed(2)),
        price: parseFloat(price.toFixed(2)),
        costOfShipping: parseFloat(costOfShipping.toFixed(2)),
        productId: id,
      },
    ];
    if (event.target.checked) {
      if (checked.length === 0) {
        setChecked([
          {
            quantity: quantity,
            discount: parseFloat(discountRate.toFixed(2)),
            price: parseFloat(price.toFixed(2)),
            costOfShipping: parseFloat(costOfShipping.toFixed(2)),
            productId: id,
          },
        ]);
      } else {
        setChecked(updateList);
      }
    } else {
      if (checked.length > 0) {
        let index = checked.findIndex((c) => c.productId === id);
        let aux = checked;

        checked.splice(index, 1);
      }
    }
  };

  const inputChange = (event: any) => {
    setGuide(event.target.value);
  };
  const transportChange = (event: any) => {
    setTransport(event.target.value);
  };

  const checkAll = (e: any) => {
    let list: any[] = [];
    if (e.target.checked) {
      active.detail.forEach((element: any) => {
        const { quantity, discountRate, price, product, costOfShipping } = element;
        const { id } = product;

        list.push({
          quantity: quantity,
          discount: parseFloat(discountRate.toFixed(2)),
          price: parseFloat(price.toFixed(2)),
          costOfShipping: parseFloat(costOfShipping.toFixed(2)),
          productId: id,
        });
      });

      setChecked(list);
    } else {
      if (checked.length > 0) {
        setChecked([]);
      }
    }
  };

  const getTransports = () => {
    if (user !== null) {
      fetch(endPoints.transports.get, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setTransports(dat.content);
          }
        });
    }
  };

  useEffect(() => {
    getTransports();
  }, [show]);

  useEffect(() => {
    setChecked([]);
  }, [active]);

  useEffect(() => {
    setChecked([...checked]);
  }, [!change]);

  const doShipping = () => {
    if (user !== null) {
      fetch(endPoints.shipments, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guideNumber: guide,
          orderId: active.id,
          transportCompanyId: parseInt(transport),
          warehouseId: warehouseId,
          shippingDetail: checked,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            setOpen(false);
            setShow(false);
            setShowSend(false);
            setTransport(0);
            setGuide('');
            setChecked([]);
            getOrders(warehouseId);
          }
        });
    }
  };

  return (
    <>
      <Transition.Root show={open == true ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-80"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-4xl md:px-4 md:my-8 md:align-middle lg:max-w-6xl">
                <div className="relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-10">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="bg-white">
                    <div className="w-full">
                      <div className="px-4 sm:px-0">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                          Pedido #{active && active.id}
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                          Gestiona este pedido y realiza el envió
                          correspondiente
                        </p>
                        <p className="mt-2 font-light text-sm text-gray-500 text-right">
                          Pedido generado: {active && moment(active.createdAt).format('DD/MM/YYYY')}
                        </p>
                      </div>

                      <div className="w-full my-4">
                        <div className="space-y-5 divide-gray-200 sm:space-y-24">
                          <div className="bg-gray-50 shadow  sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-1">
                            <dl className="divide-y divide-gray-200 space-y-4 text-sm text-gray-600 flex-auto md:divide-y-0 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-2 sm:m-1/4 md:w-1/1 lg:w-full lg:flex-none lg:gap-x-1">
                              <div className="flex justify-between  md:block">
                                <dt className="font-medium text-gray-900">
                                  Nombre
                                </dt>
                                <dd className="md:mt-1">
                                  {active && active.clientName}{' '}
                                  {active && active.clientSurnames} &nbsp;
                                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  &nbsp; &nbsp; &nbsp;
                                </dd>
                              </div>
                              <div className="flex justify-between pt-4 md:block md:pt-0">
                                <dt className="font-medium text-gray-900">
                                  Dirección
                                </dt>
                                <dd className="md:mt-1">
                                  {active && active.shippingAddress}
                                </dd>
                              </div>
                              <div className="flex justify-between  md:block md:pt-0">
                                <dt className="font-medium text-gray-900">
                                  Teléfono
                                </dt>
                                <dd className="md:mt-1">
                                  +502 {active && active.clientCellPhone}
                                </dd>
                              </div>
                            </dl>
                          </div>
                          <div
                            style={{ marginTop: -1 }}
                            className="mt-4 flow-root  sm:mt-10 sm:px-0"
                          >
                            {show === false ? (
                              <section aria-labelledby="cart-heading">
                                <ul
                                  role="list"
                                  className="border-t  border-gray-200 divide-y divide-gray-200"
                                >
                                  <li className="flex py-6">
                                    <div className="flex-shrink-0">&nbsp;</div>

                                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                                      <div>
                                        <div className="flex justify-between">
                                          <h4 className="text-sm">&nbsp;</h4>
                                          <p className="ml-4 text-sm font-medium text-gray-900"></p>
                                          <p className="ml-4 text-sm font-medium text-gray-600">
                                            <span className="mx-2 ">Todo</span>
                                            <input
                                              id={`person`}
                                              name={`person`}
                                              onChange={checkAll}
                                              type="checkbox"
                                              className="focus:ring-sky-500 h-5 w-5  text-sky-600 border-gray-300 rounded"
                                            />
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  {active &&
                                    active.detail.map((d: any, index: any) => (
                                      <li key={index} className="flex py-6">
                                        <div className="flex-shrink-0">
                                          {d.product.images !== null ? (
                                            d.product.images
                                              .filter(
                                                (p: any) => p.principal === true
                                              )
                                              .map((i: any, index2: any) => (
                                                <div key={index2}>
                                                  <Image
                                                    src={
                                                      endPoints.files.download +
                                                      '/' +
                                                      i.key
                                                    }
                                                    className="col-start-2 col-end-3 sm:col-start-1 sm:row-start-1 sm:row-span-2 w-20 h-20 rounded-lg object-center object-cover sm:w-40 sm:h-40 lg:w-24 lg:h-24"
                                                    width={100}
                                                    height={100}
                                                  />
                                                </div>
                                              ))
                                          ) : (
                                            <div className="col-start-2 bg-gray-300 col-end-3 sm:col-start-1 sm:row-start-1 sm:row-span-2 w-20 h-20 rounded-lg object-center object-cover sm:w-40 sm:h-40 lg:w-24 lg:h-24"></div>
                                          )}
                                        </div>

                                        <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                                          <div>
                                            <div className="flex justify-between">
                                              <h4 className="text-sm">
                                                <a className="font-medium text-gray-700 hover:text-gray-800">
                                                  {d.product.name}
                                                  <br />
                                                  <span className="text-gray-500 font-normal ">
                                                    {d.product.description}
                                                  </span>
                                                  <br />
                                                  <span className="font-normal text-gray-700 font-bold">
                                                    Q {parseFloat(d.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                    {/* {d.product.offer > 0 && (
                                                      <>
                                                        &nbsp; - &nbsp;
                                                        <span className="text-red-500 py-1 line-through">
                                                          Q {parseFloat(d.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                        </span>
                                                      </>
                                                    )} */}
                                                  </span>
                                                  <br />
                                                  <span className="font-normal text-gray-500">
                                                    Cantidad {d.quantity}
                                                  </span>
                                                </a>
                                              </h4>
                                              <p className="ml-4 text-sm font-medium text-gray-900"></p>
                                              <p className="ml-4 text-sm font-medium text-gray-900">
                                                <input
                                                  id={`detail${d.id}`}
                                                  name={`detail${d.id}`}
                                                  value={d}
                                                  type="checkbox"
                                                  checked={
                                                    checked.find(
                                                      (c) =>
                                                        c.productId ===
                                                        d.product.id
                                                    )
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={(e) => {
                                                    handleCheck(d, e);
                                                    setChange(!change);
                                                  }}
                                                  className="focus:ring-cblue-500 h-5 w-5 text-cblue-100 border-gray-400 rounded"
                                                />
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                                {active && (
                                  <ul className="border-0 my-4">
                                    <div className="w-full border-0 flex flex-row-reverse ">
                                      <div className="xl:basis-1/3 bg-gray-100 shadow-sm p-4 rounded-md md:w-full">
                                        <table className="min-w-full text-sm rounded-3xl z-1">
                                          <tbody>
                                            <tr>
                                              <td className="font-medium text-gray-500">
                                                Sub-total:
                                              </td>
                                              <td className="text-gray-500">
                                                Q{' '}
                                                {parseFloat(
                                                  active.amount
                                                ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="font-medium text-gray-500">
                                                Descuento:
                                              </td>
                                              <td className="text-gray-500">
                                                Q{' '}
                                                {parseFloat(
                                                  active.discount
                                                ).toFixed(2)}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="font-medium text-gray-500">
                                                Costo de envió:
                                              </td>
                                              <td className="text-gray-500">
                                                Q {parseFloat(active.costOfShipping).toFixed(2)}
                                              </td>
                                            </tr>
                                            <tr className="border-t border-1">
                                              <td className="font-medium text-gray-500">
                                                Total:
                                              </td>
                                              <td className="text-gray-500 font-bold">
                                                Q{' '}
                                                {parseFloat(
                                                  active.totalAmount
                                                ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </ul>
                                )}
                                <ul
                                  role="list"
                                  className=" border-b border-gray-200 divide-y divide-gray-200"
                                >
                                  <button
                                    disabled={checked.length > 0 ? false : true}
                                    onClick={() => setShow(true)}
                                    className="w-full disabled:bg-blueGray-600 text-white text-center p-4 bg-cblue-500 hover:bg-cblue-100"
                                  >
                                    Proceder a Enviar
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowSend(false);
                                      setShow(false);
                                      setOpen(false);
                                    }}
                                    className="w-full text-gray-700  text-center p-4 bg-gray-200 hover:bg-gray-300 my-2"
                                  >
                                    Cancelar
                                  </button>
                                </ul>
                              </section>
                            ) : (
                              <section
                                aria-labelledby="summary-heading"
                                className="mt-4"
                              >
                                <div className="shadow-md rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                                  <h2 id="summary-heading" className="sr-only">
                                    Resumen del Pedido
                                  </h2>

                                  <div className="flow-root">
                                    <dl className="-my-4 text-sm divide-y divide-gray-200">
                                      <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">
                                          Enviar por
                                        </dt>
                                        <dd className="font-medium text-gray-900">
                                          <select
                                            name="categoryId"
                                            onChange={transportChange}
                                            className="w-60 border-gray-300 focus:outline-none focus:ring-cblue-500 focus:border-cblue-500 mt-1 block  pl-3 pr-10 py-2 text-base sm:text-sm rounded-md"
                                          >
                                            <option value="">
                                              Seleccione una transporte
                                            </option>
                                            {transports.map(
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
                                          </select>
                                        </dd>
                                      </div>
                                      <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">
                                          Numero de Guía
                                        </dt>
                                        <dd className="font-medium text-gray-900">
                                          <input
                                            onChange={inputChange}
                                            className="border-gray-300   w-60  placeholder-gray-400  focus:ring-cblue-500 focus:border-cblue-500 appearance-none block border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                          />
                                        </dd>
                                      </div>
                                    </dl>
                                  </div>
                                </div>
                                <div className="mt-10">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      doShipping();
                                    }}
                                    className="w-full  bg-cblue-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cblue-500"
                                  >
                                    Enviar
                                  </button>
                                </div>

                                <div className="mt-6 text-sm text-center text-gray-500">
                                  <p>
                                    o{' '}
                                    <a
                                      href="#"
                                      className="text-cblue-500 font-medium hover:text-cblue-100"
                                      onClick={() => {
                                        setShow(false);
                                      }}
                                    >
                                      Ver Detalle
                                      <span aria-hidden="true"> &rarr;</span>
                                    </a>
                                  </p>
                                </div>
                              </section>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
