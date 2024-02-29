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
import { CheckIcon, ExclamationIcon, XIcon } from '@heroicons/react/outline';
import { InboxIcon, StarIcon, TrashIcon } from '@heroicons/react/solid';
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
import Modal from '@components/Modal';
import getSessionStorage from 'utils/get-session-storage';
import Image from 'next/image';
import { selectAuth } from '@redux/states/Auth';
import { useAppSelector } from '@redux/app/hooks';

export default function OrderDetail({
  open,
  setOpen,
  active,
  setShoww,
  setMessage,
  getOrders,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  active: any;
  setShoww: (open: boolean) => void;
  setMessage: any;
  getOrders: any;
}) {
  const { user } = useAppSelector(selectAuth);
  const [showSend, setShowSend] = useState(true);
  const [show, setShow] = useState(true);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [transports, setTransports] = useState([]);
  const [shippings, setShippings] = useState([]);
  const [id, setId] = useState(0);
  const [guide, setGuide] = useState('');
  const [returned, setReturned] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState([]);

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

  const changeStatus = (status: string) => {
    if (user !== null) {
      fetch(endPoints.changeStatusShipment(id, status), {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          getShippings(active && active.id);
          getOrders();
          setOpenModal(false);
          setOpen(false);
          setMessage('Transaccion realizada exitosamente!');
          setShoww(true);
        });
    }
  };

  const getShippings = (id: any) => {
    setShippings([]);
    if (user !== null) {
      fetch(endPoints.shipmentsByOrder(id), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setShippings(dat.content);
          } else {
            setShippings([]);
          }
        });
    }
  };

  const getNotes = (id: any) => {
    if (user !== null) {
      fetch(endPoints.followUp.notes(id), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setNotes(dat.content);
          } else {
            setNotes([]);
          }
        });
    }
  };

  useEffect(() => {
    getTransports();
  }, []);
  useEffect(() => {
    getShippings(active && active.id);
  }, [active && active.id]);

  return (
    <>
      <Transition.Root show={open == true ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-80 "
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
                      {show === false && (
                        <div className="px-4 sm:px-0">
                          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                            Pedido #{active && active.id}
                          </h1>
                          <p className="mt-2 text-sm text-gray-500">
                            Gestiona este pedido y realiza el envió
                            correspondiente
                          </p>
                        </div>
                      )}

                      <div className="w-full my-4">
                        <div className="space-y-5 divide-gray-200 sm:space-y-24">
                          {show === false && (
                            <div className="bg-gray-50 shadow  sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                              <dl className="divide-y divide-gray-200 space-y-4 text-sm text-gray-600 flex-auto md:divide-y-0 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-2 sm:m-1/4 md:w-1/1 lg:w-1/2 lg:flex-none lg:gap-x-12">
                                <div className="flex justify-between  md:block">
                                  <dt className="font-medium text-gray-900">
                                    Nombre
                                  </dt>
                                  <dd className="md:mt-1">
                                    {active.clientName} {active.clientSurnames}
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp;
                                  </dd>
                                </div>
                                <div className="flex justify-between w-full pt-4 md:block md:pt-0">
                                  <dt className="font-medium text-gray-900">
                                    Dirección
                                  </dt>
                                  <dd className="md:mt-1">
                                    {active.shippingAddress}
                                  </dd>
                                </div>
                              </dl>
                              <div className="space-y-4 mt-6 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                                <div className="w-full">
                                  {showSend && (
                                    <ul
                                      role="list"
                                      className="border-t border-b border-gray-200 divide-y divide-gray-200"
                                    >
                                      <button
                                        onClick={() => setShow(true)}
                                        className="w-full text-white text-center p-2 rounded-md bg-cblue-500 hover:bg-cblue-100"
                                      >
                                        Ver Envíos
                                      </button>
                                    </ul>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          <div
                            style={{ marginTop: -1 }}
                            className="mt-4 flow-root  sm:mt-10 sm:px-0"
                          >
                            {show === false ? (
                              <section aria-labelledby="cart-heading">
                                <ul
                                  role="list"
                                  className="border-t border-b border-gray-200 divide-y divide-gray-200"
                                >
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
                                                  <img
                                                    src={
                                                      endPoints.files.download +
                                                      '/' +
                                                      i.key
                                                    }
                                                    className="col-start-2 col-end-3  sm:col-start-1 sm:row-start-1 sm:row-span-2 w-16 h-16 rounded-lg object-center object-fill sm:w-24 sm:h-24 "
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
                                                  <span className="font-normal text-gray-500">
                                                    Q{' '}
                                                    {parseFloat(d.product.price)
                                                      .toFixed(2)
                                                      .replace(
                                                        /\d(?=(\d{3})+\.)/g,
                                                        '$&,'
                                                      )}
                                                    {d.product.offer > 0 && (
                                                      <>
                                                        &nbsp; - &nbsp;
                                                        <span className="text-red-500 py-1 line-through">
                                                          Q {d.price}
                                                        </span>
                                                      </>
                                                    )}
                                                  </span>
                                                  <br />
                                                  <span className="font-normal text-gray-500">
                                                    Cantidad {d.quantity}
                                                  </span>
                                                </a>
                                              </h4>
                                              <p className="ml-4 text-sm font-medium text-gray-900"></p>
                                              {showSend && (
                                                <p className="ml-4 text-sm font-medium text-gray-900"></p>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                              </section>
                            ) : (
                              <section
                                aria-labelledby="summary-heading"
                                className=""
                              >
                                <div className="bg-white">
                                  <div className="px-4 sm:px-0">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                      Pedido Enviado # {active && active.id}
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-500">
                                      Envíos realizados por pedido
                                    </p>
                                  </div>

                                  <div className="mt-4">
                                    <div className="space-y-6 sm:space-y-10">
                                      {shippings &&
                                        shippings.map(
                                          (order: any, index: any) => (
                                            <div key={index}>
                                              <h3 className="sr-only">
                                                Order placed on{' '}
                                                <time
                                                  dateTime={order.createdAt}
                                                >
                                                  {moment(
                                                    order.createdAt
                                                  ).format('DD/MM/YYYY')}
                                                </time>
                                              </h3>

                                              <div className="bg-gray-50 px-4 py-4 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                                                <dl className="divide-y divide-gray-200 space-y-2 text-sm text-gray-600 flex-auto md:divide-y-0 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                                  <div className="flex justify-between md:block">
                                                    <dt className="font-medium text-gray-900">
                                                      Numero de Guía
                                                    </dt>
                                                    <dd className="md:mt-1">
                                                      {order.guideNumber}&nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;&nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;&nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;&nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                    </dd>
                                                  </div>
                                                  <div className="flex justify-between pt-4 md:block md:pt-0">
                                                    <dt className="font-medium text-gray-900">
                                                      Fecha de Envió
                                                    </dt>
                                                    <dd className="md:mt-1">
                                                      <time
                                                        dateTime={
                                                          order.createdAt
                                                        }
                                                      >
                                                        {moment(
                                                          order.createdAt
                                                        ).format('DD/MM/YYYY')}
                                                      </time>
                                                    </dd>
                                                  </div>
                                                  <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                                                    <dt>Status</dt>
                                                    <dd className="md:mt-1">
                                                      {order.status ===
                                                        'SEND' && (
                                                        <span className="px-1 rounded-lg text-cblue-500 bg-blue-100">
                                                          Enviado
                                                        </span>
                                                      )}
                                                      {order.status ===
                                                        'DELIVERED' && (
                                                        <span className="px-1 rounded-lg text-green-600 bg-green-100">
                                                          Entregado
                                                        </span>
                                                      )}
                                                      {order.status ===
                                                        'RETURNED' && (
                                                        <span className="px-1 rounded-lg text-red-600 bg-red-100">
                                                          Retornado
                                                        </span>
                                                      )}
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; &nbsp; &nbsp;
                                                    </dd>
                                                  </div>
                                                </dl>
                                                <div className="space-y-4 mt-6 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                                                  {order.status === 'SEND' && (
                                                    <>
                                                      {showNotes === false ? (
                                                        <>
                                                          <button
                                                            type="button"
                                                            className="bg-blue rounded-md text-white p-2 right-16  hover:bg-cblue-500 "
                                                            onClick={() => {
                                                              getNotes(
                                                                order.id
                                                              );
                                                              setShowNotes(
                                                                true
                                                              );
                                                            }}
                                                          >
                                                            Ver Notas
                                                          </button>
                                                          <a
                                                            onClick={() => {
                                                              setId(order.id);
                                                              setGuide(
                                                                order.guideNumber
                                                              );
                                                              setReturned(true);
                                                              setOpenModal(
                                                                true
                                                              );
                                                            }}
                                                            className="w-full flex items-center cursor-pointer justify-center bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 md:w-auto"
                                                          >
                                                            <span className="text-sm">
                                                              Retornar
                                                            </span>
                                                          </a>
                                                        </>
                                                      ) : (
                                                        <button
                                                          type="button"
                                                          className="w-full flex items-center cursor-pointer justify-center bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 md:w-auto"
                                                          onClick={() =>
                                                            setShowNotes(false)
                                                          }
                                                        >
                                                          Regresar
                                                        </button>
                                                      )}

                                                      {/* <a
                                                        onClick={() => {
                                                          setId(order.id);
                                                          setGuide(
                                                            order.guideNumber
                                                          );
                                                          setReturned(false);
                                                          setOpenModal(true);
                                                        }}
                                                        className="w-full flex items-center cursor-pointer justify-center bg-cblue-500  py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-cblue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 md:w-auto"
                                                      >
                                                        <span className="text-sm">
                                                          Entregar
                                                        </span>
                                                      </a> */}
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                              {showNotes === true ? (
                                                <div className="flex items-start space-x-4">
                                                  <div className="flex-shrink-0"></div>
                                                  <div className="min-w-0 flex-1">
                                                    <div className="flow-root my-10">
                                                      <ul
                                                        role="list"
                                                        className="-mb-8"
                                                      >
                                                        {notes.map(
                                                          (
                                                            s: any,
                                                            index: any
                                                          ) => (
                                                            <li key={s.id}>
                                                              <div className="relative pb-8 ">
                                                                {index !==
                                                                notes.length -
                                                                  1 ? (
                                                                  <span
                                                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                                    aria-hidden="true"
                                                                  />
                                                                ) : null}
                                                                <div className="relative flex space-x-3 ">
                                                                  <div>
                                                                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-blueGray-400">
                                                                      <InboxIcon
                                                                        className="h-5 w-5 text-white"
                                                                        aria-hidden="true"
                                                                      />
                                                                    </span>
                                                                  </div>
                                                                  <div className="min-w-0  bg-blueGray-50   py-4 px-3  shadow-lg shadow-gray-300 rounded-lg flex-1 pt-1.5 flex justify-between space-x-4">
                                                                    <div className="p-2">
                                                                      <p className="text-md py-2 text-gray-500">
                                                                        {s.note}
                                                                      </p>
                                                                      <p className="text-sm py-2 text-gray-500">
                                                                        <b>
                                                                          Creada
                                                                          por:
                                                                        </b>{' '}
                                                                        {s.name}
                                                                        ,{' '}
                                                                        <b>
                                                                          No.
                                                                          Guia:
                                                                        </b>{' '}
                                                                        {
                                                                          s.guide
                                                                        }
                                                                      </p>
                                                                    </div>
                                                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                      <time
                                                                        dateTime={
                                                                          s.createAt
                                                                        }
                                                                      >
                                                                        <b>
                                                                          {moment(
                                                                            s.createAt
                                                                          ).format(
                                                                            'DD/MM/YYYY'
                                                                          )}
                                                                        </b>
                                                                      </time>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </li>
                                                          )
                                                        )}
                                                      </ul>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                <>
                                                  <table className="shadow-xl w-full rounded-lg shadow-gray-100">
                                                    <tbody className="-my-6 divide-y divide-gray-100 ">
                                                      {order.detail.map(
                                                        (
                                                          product: any,
                                                          index2: any
                                                        ) => (
                                                          <tr
                                                            key={index2}
                                                            className="flex py-4"
                                                          >
                                                            <td className="w-96">
                                                              <h4 className="font-medium text-gray-900">
                                                                {
                                                                  product.productName
                                                                }
                                                              </h4>
                                                              <p className="hidden mt-2 text-sm truncate text-gray-500 sm:block">
                                                                {
                                                                  product.productDescription
                                                                }
                                                              </p>
                                                              <p className="text-sm">
                                                                <span className="font-normal text-gray-500">
                                                                  <br />Q{' '}
                                                                  {parseFloat(
                                                                    product.price
                                                                  )
                                                                    .toFixed(2)
                                                                    .replace(
                                                                      /\d(?=(\d{3})+\.)/g,
                                                                      '$&,'
                                                                    )}
                                                                  <span className="font-normal text-gray-700 font-bold">
                                                                    {product.discount >
                                                                      0 && (
                                                                      <>
                                                                        &nbsp; -
                                                                        &nbsp;
                                                                        <span className="text-red-500 py-1 line-through">
                                                                          Q{' '}
                                                                          {parseFloat(
                                                                            product.previousPrice
                                                                          )
                                                                            .toFixed(
                                                                              2
                                                                            )
                                                                            .replace(
                                                                              /\d(?=(\d{3})+\.)/g,
                                                                              '$&,'
                                                                            )}
                                                                        </span>
                                                                      </>
                                                                    )}
                                                                  </span>
                                                                </span>
                                                                <br />
                                                                <span className="font-normal text-gray-500">
                                                                  Cantidad{' '}
                                                                  {
                                                                    product.quantity
                                                                  }
                                                                </span>
                                                              </p>
                                                            </td>
                                                            <td className="text-right"></td>
                                                            <td className="ml-4 px-2 flex-shrink-0 sm:m-0 sm:mr-6 sm:order-first">
                                                              <img
                                                                src={
                                                                  endPoints
                                                                    .files
                                                                    .download +
                                                                  '/' +
                                                                  product.productImage
                                                                }
                                                                alt={
                                                                  product.productImage
                                                                }
                                                                className="col-start-2 col-end-3  sm:col-start-1 sm:row-start-1 sm:row-span-2 w-16 h-16 rounded-lg object-center object-fill sm:w-24 sm:h-24 "
                                                              />
                                                            </td>
                                                          </tr>
                                                        )
                                                      )}
                                                    </tbody>
                                                  </table>

                                                  <ul className="border-0 my-4">
                                                    <div className="w-full border-0 flex flex-row-reverse ">
                                                      <div className="basis-1/3 bg-gray-50  p-4 rounded-md">
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
                                                                )
                                                                  .toFixed(2)
                                                                  .replace(
                                                                    /\d(?=(\d{3})+\.)/g,
                                                                    '$&,'
                                                                  )}
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
                                                                Q{' '}
                                                                {parseFloat(
                                                                  active.costOfShipping
                                                                )
                                                                  .toFixed(2)
                                                                  .replace(
                                                                    /\d(?=(\d{3})+\.)/g,
                                                                    '$&,'
                                                                  )}
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
                                                                )
                                                                  .toFixed(2)
                                                                  .replace(
                                                                    /\d(?=(\d{3})+\.)/g,
                                                                    '$&,'
                                                                  )}
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </ul>
                                                </>
                                              )}
                                            </div>
                                          )
                                        )}
                                    </div>
                                  </div>
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
          <Modal open={openModal} setOpen={setOpenModal}>
            <div className="sm:flex sm:items-start">
              <div
                className={
                  returned
                    ? 'mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10'
                    : 'mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-cblue-500 sm:mx-0 sm:h-10 sm:w-10'
                }
              >
                <ExclamationIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Marcar como {returned === true ? 'Retornado' : 'Entregado'}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    esta seguro que el pedido con numero de guía
                    <strong> #{guide}</strong> fue{' '}
                    {returned === true ? 'retornado' : 'entregado'} de ser asi
                    por favor haga click en el botón aceptar{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={
                  returned
                    ? 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                    : 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cblue-500 text-base font-medium text-white hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 sm:ml-3 sm:w-auto sm:text-sm'
                }
                onClick={() => {
                  changeStatus(returned === true ? 'RETURNED' : 'DELIVERED');
                }}
              >
                Aceptar
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </button>
            </div>
          </Modal>
        </Dialog>
      </Transition.Root>
    </>
  );
}
