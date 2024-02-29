/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  CogIcon,
  EmojiHappyIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  PaperClipIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  ArrowLeftIcon,
  FilterIcon,
  InboxIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import AdminLayout from 'layouts/AdminLayout';
import {
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import { CheckIcon, UserIcon } from '@heroicons/react/solid';
import endPoints from '@services/api';
import { selectAuth } from '@redux/states/Auth';
import { useAppSelector } from '@redux/app/hooks';
import moment from 'moment';
import Modal from '@components/Modal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MyTextArea } from '@common/MyTextArea';
import Notifications from '@common/Notifications';
import Detail from './detail';

const timeline = [
  {
    id: 1,
    content: 'Applied to',
    target: 'Front End Developer',
    href: '#',
    date: 'Sep 20',
    datetime: '2020-09-20',
    icon: InboxIcon,
    iconBackground: 'bg-gray-300',
  },
  {
    id: 2,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    icon: InboxIcon,
    iconBackground: 'bg-gray-300',
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    href: '#',
    date: 'Sep 28',
    datetime: '2020-09-28',
    icon: InboxIcon,
    iconBackground: 'bg-gray-300',
  },
  {
    id: 4,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 30',
    datetime: '2020-09-30',
    icon: InboxIcon,
    iconBackground: 'bg-gray-300',
  },
  {
    id: 5,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    href: '#',
    date: 'Oct 4',
    datetime: '2020-10-04',
    icon: InboxIcon,
    iconBackground: 'bg-gray-300',
  },
];
const moods = [
  {
    name: 'Excited',
    value: 'excited',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500',
  },
  {
    name: 'Loved',
    value: 'loved',
    icon: HeartIcon,
    iconColor: 'text-white',
    bgColor: 'bg-pink-400',
  },
  {
    name: 'Happy',
    value: 'happy',
    icon: EmojiHappyIcon,
    iconColor: 'text-white',
    bgColor: 'bg-green-400',
  },
  {
    name: 'Sad',
    value: 'sad',
    icon: EmojiSadIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-400',
  },
  {
    name: 'Thumbsy',
    value: 'thumbsy',
    icon: ThumbUpIcon,
    iconColor: 'text-white',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'I feel nothing',
    value: null,
    icon: XIcon,
    iconColor: 'text-gray-400',
    bgColor: 'bg-transparent',
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function CustomerService() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(moods[5]);
  const { user } = useAppSelector(selectAuth);
  const [shipments, setShipments] = useState([]);
  const [guide, setGuide] = useState('');
  const [guideSelected, setGuideSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [shipment, setShipment] = useState(0);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showNotesOrder, setShowNotesOrder] = useState(false);
  const [showNotesOrderMb, setShowNotesOrderMb] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [total, setTotal] = useState(0);
  const [constOfShipping, setCostOfShipping] = useState(0);
  const [sendAt, SetSendAt] = useState('');

  const getShipments = () => {
    if (user !== null) {
      fetch(endPoints.followUp.shipments, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setShipments(dat.content);
          } else {
            setShipments([]);
          }
        });
    }
  };

  const handleChange = (e: any) => {
    setGuide(e.target.value);
  };

  const getNotes = (id: any, guide: any, index: any) => {
    if (user !== null) {
      setGuideSelected(guide);

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

  const addNote = (values: any) => {
    if (user !== null) {
      fetch(`${endPoints.followUp.addNote}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            setOpen(false);
            setDisabled(false);
            setShow(true);
            setMessage('La nota fue agregada exitosamente!!!');
            getNotes(shipment, '', 0);
          }
        });
    }
  };

  useEffect(() => {
    getShipments();
  }, []);

  useEffect(() => {
    let totalAmount = 0;
    let costOS = 0;
    orderDetail.map((d: any) => {
      totalAmount += d.amount;
      costOS += d.costOfShipping;
    });

    setCostOfShipping(costOS);
    setTotal(totalAmount);
  }, [orderDetail]);

  return (
    <AdminLayout title={''} pageDescription={''}>
      <Modal open={showDetail} setOpen={setShowDetail}>
        <Detail
          open={showDetail}
          setOpen={setShowDetail}
          guide={guideSelected}
          detail={orderDetail}
          total={total}
          constOfShipping={constOfShipping}
          sendAt={sendAt}
        />
      </Modal>
      {/*
        This example requires updating your template:
      */}
      <div className="h-full flex">
        {/* Static sidebar for desktop */}
        <div className="flex flex-col min-w-0 flex-1  overflow-hidden ">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 bg-white overflow-y-auto hidden md:block focus:outline-none sm:order-last xl:order-last">
              {/* Breadcrumb */}

              <article className="bg-white ">
                {/* Profile header */}
                <div className="bg-white ">
                  <div></div>{' '}
                  {showNotesOrder && (
                    <div className="max-w-5xl  bg-gray-50 shadow rounded-md p-1 my-5   mx-auto px-4  sm:px-6 lg:px-8">
                      <div className="-mt-12 my-10 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-2 sm:pb-1">
                          <div className="s mt-20 min-w-0 flex-1">
                            <h1 className="m:text-xs md:text-2xl font-bold text-gray-900 truncate">
                              Notas{' '}
                              <span className="text-gray-500 font-normal">
                                {guideSelected && '/ #' + guideSelected}
                              </span>
                            </h1>
                          </div>
                          <div className=" flex   mt-20 flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <>
                              <button
                                onClick={() => setOpen(true)}
                                type="button"
                                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <MailIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Agregar Nota</span>
                              </button>
                              <button
                                onClick={() => setShowDetail(true)}
                                type="button"
                                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-cblue-500 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <ViewGridAddIcon
                                  className="-ml-1 mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span>Ver detalle</span>
                              </button>
                            </>
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate"></h1>
                      </div>
                    </div>
                  )}
                </div>
                {/* Team member list */}
                <div className="mt-8 bg-white   max-w-5xl mx-auto px-4 pb-12 ">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <div className="flow-root my-10">
                        <ul role="list" className="-mb-8">
                          {notes.map((s: any, index: any) => (
                            <li key={s.id}>
                              <div className="relative pb-8 ">
                                {index !== timeline.length - 1 ? (
                                  <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <div className="relative flex space-x-3 ">
                                  <div>
                                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-300">
                                      <InboxIcon
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </div>
                                  <div className="min-w-0  bg-gray-50   py-4 px-3  shadow-lg shadow-gray-300 rounded-lg flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div className="p-2">
                                      <p className="text-md py-2 text-gray-500">
                                        {s.note}
                                      </p>
                                      <p className="text-sm py-2 text-gray-500">
                                        <b>Creada por:</b> {s.name},{' '}
                                        <b>No. Guia:</b> {s.guide}
                                      </p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                      <time dateTime={s.createAt}>
                                        <b>
                                          {moment(s.createAt).format(
                                            'DD/MM/YYYY'
                                          )}
                                        </b>
                                      </time>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </main>
            {showNotesOrderMb === true && (
              <main className="flex-1 relative z-0 bg-white overflow-y-auto sm:hidden focus:outline-none sm:order-last xl:order-last">
                {/* Breadcrumb */}

                <article className="bg-white ">
                  {/* Profile header */}
                  <div className="bg-white ">
                    <div></div>{' '}
                    <div className="max-w-5xl  bg-gray-50 shadow rounded-md p-1 my-5   mx-auto px-4  sm:px-6 lg:px-8">
                      <div className="-mt-12 my-10 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-2 sm:pb-1">
                          <div className="mt-20 min-w-0 flex-1">
                            <h1 className="m:text-xs md:text-2xl font-bold text-gray-900 truncate">
                              Notas{' '}
                              <span className="text-gray-500 font-normal">
                                {guideSelected && '/ #' + guideSelected}
                              </span>
                            </h1>
                          </div>
                          <div className=" flex   mt-20  sm:mt-2 flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <>
                              <button
                                onClick={() => setShowNotesOrderMb(false)}
                                type="button"
                                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <ArrowLeftIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Ver guias</span>
                              </button>
                              <button
                                onClick={() => setOpen(true)}
                                type="button"
                                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-cblue-500 hover:bg-cblue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <MailIcon
                                  className="-ml-1 mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span>Agregar Nota</span>
                              </button>
                              <button
                                onClick={() => setShowDetail(true)}
                                type="button"
                                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <ViewGridAddIcon
                                  className="-ml-1 mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span>Ver detalle</span>
                              </button>
                            </>
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate"></h1>
                      </div>
                    </div>
                  </div>
                  {/* Team member list */}
                  <div className="mt-8 bg-white   max-w-5xl mx-auto px-4 pb-12 ">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <div className="flow-root my-10">
                          <ul role="list" className="-mb-8">
                            {notes.map((s: any, index: any) => (
                              <li key={s.id}>
                                <div className="relative pb-8 ">
                                  {index !== timeline.length - 1 ? (
                                    <span
                                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                      aria-hidden="true"
                                    />
                                  ) : null}
                                  <div className="relative flex space-x-3 ">
                                    <div>
                                      <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-300">
                                        <InboxIcon
                                          className="h-5 w-5 text-white"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </div>
                                    <div className="min-w-0  bg-gray-50   py-4 px-3  shadow-lg shadow-gray-300 rounded-lg flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div className="p-2">
                                        <p className="text-md py-2 text-gray-500">
                                          {s.note}
                                        </p>
                                        <p className="text-sm py-2 text-gray-500">
                                          <b>Creada por:</b> {s.name},{' '}
                                          <b>No. Guia:</b> {s.guide}
                                        </p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime={s.createAt}>
                                          <b>
                                            {moment(s.createAt).format(
                                              'DD/MM/YYYY'
                                            )}
                                          </b>
                                        </time>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </main>
            )}
            <aside className="hidden sm:block flex-col flex-shrink-0 sm:w-full sm:px-12 md:px-0 md:w-96 border-r border-gray-100 shadow">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Servicio al cliente
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Ayuda a brindar informacion si existe algun problema con los
                  pedidos de tus clientes
                </p>
                <form className="mt-6 flex space-x-4" action="#">
                  <div className="flex-1 min-w-0">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-ss-none">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        onChange={handleChange}
                        autoComplete="off"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
              {/* Shipments list */}
              <nav
                className="md:flex-1 md:min-h-0 overflow-y-auto sm:w-full "
                aria-label="Shipments"
              >
                <div className="relative">
                  <ul
                    role="list"
                    className="relative z-0 divide-y divide-gray-200"
                  >
                    {shipments
                      .filter((sh: any) => sh.guide.includes(guide))
                      .map((s: any, index) => (
                        <li
                          onClick={() => {
                            setNotes([]);
                            SetSendAt(s.sendAt);
                            setShowNotesOrder(true);
                            setShipment(s.shipmentId);
                            setOrderDetail(s.detail);
                            getNotes(s.shipmentId, s.guide, index);
                          }}
                          key={index}
                        >
                          <div
                            className={
                              s.shipmentId === shipment
                                ? 'relative px-6 py-5 flex items-center space-x-3 bg-gray-200 active  focus-within:bg-gray-200'
                                : 'relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-200    focus-within:bg-gray-200'
                            }
                          >
                            <div className="flex-1 min-w-0">
                              <a href="#" className="focus:outline-none">
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-gray-900">
                                  <b>No. Guia</b> - {s.guide}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  Enviado por {s.transport}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {s.name}
                                </p>
                              </a>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </nav>
            </aside>
            {showNotesOrderMb === false && (
              <aside className="flex-col flex-shrink-0 sm:hidden border-r border-gray-100 shadow">
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Servicio al cliente
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Ayuda a brindar informacion si existe algun problema con los
                    pedidos de tus clientes
                  </p>
                  <form className="mt-6 flex space-x-4" action="#">
                    <div className="flex-1 min-w-0">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-ss-none">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          type="search"
                          name="search"
                          id="search"
                          onChange={handleChange}
                          autoComplete="off"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/* Shipments list */}
                <nav
                  className="md:flex-1 md:min-h-0 overflow-y-auto sm:w-full "
                  aria-label="Shipments"
                >
                  <div className="relative">
                    <ul
                      role="list"
                      className="relative z-0 divide-y divide-gray-200"
                    >
                      {shipments
                        .filter((sh: any) => sh.guide.includes(guide))
                        .map((s: any, index) => (
                          <li
                            onClick={() => {
                              setNotes([]);
                              SetSendAt(s.sendAt);
                              setShowNotesOrderMb(true);
                              setShowNotesOrder(true);
                              setShipment(s.shipmentId);
                              setOrderDetail(s.detail);
                              getNotes(s.shipmentId, s.guide, index);
                            }}
                            key={index}
                          >
                            <div
                              className={
                                s.shipmentId === shipment
                                  ? 'relative px-6 py-5 flex items-center space-x-3 bg-gray-200 active  focus-within:bg-gray-200'
                                  : 'relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-200    focus-within:bg-gray-200'
                              }
                            >
                              <div className="flex-1 min-w-0">
                                <a href="#" className="focus:outline-none">
                                  {/* Extend touch target to entire panel */}
                                  <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                  />
                                  <p className="text-sm font-medium text-gray-900">
                                    <b>No. Guia</b> - {s.guide}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    Enviado por {s.transport}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {s.name}
                                  </p>
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </nav>
              </aside>
            )}

            <Notifications message={message} show={show} setShow={setShow} />

            <Modal open={open} setOpen={setOpen}>
              <Formik
                initialValues={{
                  shipmentId: shipment,
                  note: '',
                }}
                onSubmit={(values) => {
                  setDisabled(true);
                  addNote(values);
                }}
                validationSchema={Yup.object({
                  note: Yup.string()
                    .required('El campo es requerido')
                    .min(10, 'Debe de ser mayor a 10 caracteres'),
                })}
              >
                {(formik) => (
                  <>
                    <div className="">
                      <div className=" text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Agregar Nota
                        </h3>
                        <div className="">
                          <p className="text-sm text-gray-500">
                            Agrega una nota de seguimiento para este pedido
                          </p>
                        </div>
                      </div>
                    </div>
                    <Form className="space-y-14 py-5">
                      {/* Campo de email */}
                      <MyTextArea
                        label="Nota"
                        name="note"
                        type="text"
                        autoComplete="off"
                      />
                      {/* Campo de Clave */}
                      <div></div>
                      {}
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          disabled={disabled}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        >
                          Guardar
                        </button>
                        <button
                          type="reset"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setOpen(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </Modal>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
