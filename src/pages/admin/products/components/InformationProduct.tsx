/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { StarIcon, TrashIcon } from '@heroicons/react/solid';
import { MyTextInput } from '@common/MyTextInput';
import * as Yup from 'yup';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  validateYupSchema,
  yupToFormErrors,
} from 'formik';
import { ButtonSubmit } from '@common/ButtonSubmit';
import { MySelect } from '@common/MySelect';
import endPoints from '@services/api';
import {
  useDispatchRegister,
  useRegister,
} from '@pages/auth/register/context/RegisterContext';
import { useStatesByCountry } from '@hooks/useStatesByCountry';
import { useCountries } from '@hooks/useCountries';
import { useCitiesByState } from '@hooks/useCitiesByState';
import validationSchemaVerifyEmail from '@common/models/validationSchemaVerifyEmail';
import validationSchemaClient from '@common/models/validationSchemaClient';
import validationSchemaEmail from '@common/models/validationSchemaEmail';
import { validationSchemaSeller } from '@common/models/validationSchemaSeller';
import { useGetUsers } from '@hooks/useGetUsers';
import moment from 'moment';
import Images from '@pages/admin/incomes/components/Images';
import {
  activeProduct,
  addLabels,
  deleteLabel,
} from '@redux/states/incomeSlice';
import { MyTextArea } from '@common/MyTextArea';
import { fetchSubCategories } from '@redux/states/subcategoriesSlice';
import { fetchData } from 'helpers/fetchData';
import { sendData } from 'helpers/sendData';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
export default function InformacionProduct({
  open,
  setOpen,
  active,
  getProducts,
  Filters,
  setMessage,
  setShow,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  active: any;
  getProducts: any;
  Filters: any;
  setMessage: any;
  setShow: any;
}) {
  const { user } = useAppSelector(selectAuth);
  const [categories, setCategories] = useState<any[]>([]);
  const [isOffer, setIsOffer] = useState(false);
  const [inventary, setInventary] = useState(false);
  const [error, setError] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [scategory, setScategory] = useState(0);
  const [category, setCategory] = useState(0);
  const [stop, setStop] = useState(false);
  const [stock, setStock] = useState(0);
  const step = useSelector((state: any) => state.ui.incomeForm);
  const incomeImages = useSelector((state: any) => state.income.images);
  const labels = useSelector((state: any) => state.income.labels);
  const subcategories = useSelector((state: any) => state.subcategory);
  const [enabled, setEnabled] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const dispatch = useDispatch();
  let initial = {};

  const handleSubCategoriesByCategories = (id: string) => {
    getSubCategories(id, 0, false);
  };

  //action to save a new product
  const updateProduct = (data: any) => {
    const endpoint = `/warehouse/products/${active.id}`;
    sendData({ method: 'PUT', endpoint, body: data })
      .then((data) => {
        if (data.code === 'SUCCESSFUL_OPERATION') {
          Filters('isOffer=', isOffer);
          setOpen(false);
          setShow(true);
          setMessage('El producto fue actualizado exitosamente!');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //get categories
  const getCategories = () => {
    if (user !== null) {
      fetch(endPoints.categories.getCategories, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            setCategories(dat.content);
          }
        });
    }
  };
  const getSubCategories = (id: any, subcategory: any, stop: any) => {
    if (user !== null) {
      fetch(endPoints.subCategories.getsubcategories(id), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            dispatch(fetchSubCategories(dat.content));
          } else {
            setScategory(0);
            dispatch(fetchSubCategories([]));
          }
        })
        .catch((err) => {
          dispatch(fetchSubCategories([]));
        });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getSubCategoriess = (id: any, subcategory: any) => {
    if (user !== null) {
      fetch(endPoints.subCategories.getsubcategories(id), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            dispatch(fetchSubCategories(dat.content));

            const subcategoryId = dat.content.filter(
              (s: any) => s.name === subcategory
            )[0];

            setScategory(subcategoryId.id);
            setScategory(subcategoryId.id);
          } else {
            dispatch(fetchSubCategories([]));
          }
        });
    }
  };

  const cargarSelects = (category: any, subcategory: any) => {
    setStop(false);
    if (stop === false) {
      const idCategory = categories.filter((m) => m.name === category)[0];
      setCategory(idCategory?.id);
      getSubCategoriess(idCategory?.id, subcategory);
    } else {
      setScategory(scategory);
    }

    return true;
  };

  useEffect(() => {
    const actives = active !== undefined ? active.internalId : null;

    if (actives) {
      cargarSelects(active.category, active.subcategory);

      let lbs: any[] = [];

      active.detail.forEach((d: any) => {
        const { label, value } = d;
        lbs.push({
          label: label,
          value: value,
        });
      });

      let product = {
        internalId: active ? active.internalId : '',
        name: active ? active.name : '',
        description: active ? active.description : '',
        price: active ? active.price : '',
        quantity: active ? active.quantity : '',
        categoryId: category > 0 ? category : '',
        label: '',
        value: '',
        images: active ? active.images : [],
        productDetail: active ? active.detail : [],
        isOffer: isOffer,
        offer: active ? active.offer : '',
        costOfShopping: active ? active.costOfShipping : '',
        taxes: active ? 0 : 0,
        deadline: active ? active.deadline : moment().add(1, 'years'),
        deliveryTime: active ? active.deliveryTime : '',
        subcategoryId: scategory > 0 ? scategory : '',
        details: lbs,
      };

      setIsOffer(active.isOffer);
      setInventary(active.inventary);
      setStock(active.stock);
      dispatch(activeProduct(product));
    }
  }, [open === true]);

  const handleChangeIn = (e: any) => {
    setInventary(e.target.value === 'true' ? true : false);
  };

  const handleChangeOff = (e: any) => {
    setIsOffer(e.target.value === 'true' ? true : false);
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
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
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
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Formik
                    enableReinitialize={enabled}
                    initialValues={{
                      internalId: active ? active.internalId : '',
                      name: active ? active.name : '',
                      description: active ? active.description : '',
                      price: active ? active.price : '',
                      quantity: active ? active.quantity : '',
                      categoryId: category > 0 ? category : '',
                      label: '',
                      value: '',
                      images: incomeImages,
                      details: active ? active.detail : [],
                      inventory: active && active.inventary,
                      isOffer: isOffer,
                      offer: active ? active.offer : '',
                      costOfShopping: active ? active.costOfShopping : '',
                      taxes: active ? 0 : 0,
                      deadline: active
                        ? active.deadline
                        : moment().add(1, 'years'),
                      deliveryTime: active ? active.deliveryTime : '',
                      subcategoryId: scategory > 0 ? scategory : '',
                      status: active && active.status,
                    }}
                    onSubmit={(values: any) => {
                      values.price = parseFloat(values.price);
                      values.offer = parseFloat(values.offer);
                      values.costOfShopping = parseFloat(values.costOfShopping);
                      values.taxes = 0;
                      values.categoryId = parseInt(values.categoryId);
                      values.subcategoryId = parseInt(values.subcategoryId);
                      values.details = labels;
                      values.images = incomeImages;
                      values.isOffer = isOffer;
                      values.iventory = inventary;
                      values.stock = stock;

                      if (labels.length > 0) {
                        setError(false);
                        if (incomeImages.length > 0) {
                          setErrorImage(false);
                          updateProduct(values);
                        } else {
                          setErrorImage(true);
                        }
                      } else {
                        setError(true);
                      }
                    }}
                    validationSchema={Yup.object({
                      internalId: Yup.string().required(
                        'El campo es requerido'
                      ),
                      name: Yup.string()
                        .required('El campo es requerido')
                        .min(2, 'Debe ser mayor a 3 caracteres')
                        .max(45, 'Longitud maxica 45 caracteres'),
                      description: Yup.string()
                        .required('El campo es requerido')
                        .min(12, 'Debe ser mayor a 12 caracteres')
                        .max(250, 'Longitud maxica 250 caracteres'),
                      price: Yup.string().required('El campo es requerido'),
                      categoryId: Yup.string().required(
                        'El campo es requerido'
                      ),
                      offer:
                        isOffer === true
                          ? Yup.string().required('El campo es requerido')
                          : Yup.string(),
                      costOfShopping: Yup.string().required(
                        'El campo es requerido'
                      ),
                      taxes: Yup.string().required('El campo es requerido'),
                      deliveryTime: Yup.string().required(
                        'El campo es requerido'
                      ),
                      subcategoryId: Yup.string().required(
                        'El campo es requerido'
                      ),
                    })}
                  >
                    {({ handleChange, handleBlur, values }) => (
                      <>
                        <span hidden>{(values.categoryId = category)}</span>

                        <Form className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12  lg:gap-x-8">
                          {/* IMAGES */}

                          <div className="sm:col-span-12 lg:col-span-12">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                              Datos del Producto
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                              Agrega los datos correspondientes del producto que
                              deseas agregar
                            </p>

                            <section
                              aria-labelledby="options-heading"
                              className="mt-8"
                            >
                              <div className=" lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
                                <div>
                                  <div className="mt-10 border-t border-gray-200 ">
                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Código"
                                            name="internalId"
                                            disabled="true"
                                            type="text"
                                            autoComplete="off"
                                            className="block w-full  border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:col-span-3">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Nombre"
                                            name="name"
                                            type="text"
                                            autoComplete="off"
                                            className="block w-full  border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>

                                      <div className="sm:col-span-3">
                                        <label
                                          htmlFor="company"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Descripción
                                        </label>
                                        <div className="mt-1">
                                          <MyTextArea
                                            rows={3}
                                            name="description"
                                            id="description"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder=""
                                            label={''}
                                          />
                                        </div>
                                      </div>

                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Precio"
                                            name="price"
                                            type="text"
                                            autoComplete="off"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>

                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MySelect
                                            name="categoryId"
                                            label="Categorías"
                                            col="col-span-6 md:col-span-3"
                                            onChange={(e: any) => {
                                              handleChange(e);
                                              handleSubCategoriesByCategories(
                                                e.target.value
                                              );
                                              setCategory(e.target.value);
                                            }}
                                          >
                                            <option value="">
                                              Seleccione una Categoría
                                            </option>
                                            {categories.map(
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
                                        </div>
                                      </div>

                                      <div className="sm:col-span-1">
                                        <span hidden>
                                          {' '}
                                          {(values.subcategoryId = scategory)}
                                        </span>
                                        <div className="mt-1">
                                          <MySelect
                                            name="subcategoryId"
                                            label="Sub-Categorías"
                                            col="col-span-6 md:col-span-3"
                                            onChange={(e: any) => {
                                              handleChange(e);
                                              setScategory(e.target.value);
                                            }}
                                          >
                                            <option value="">
                                              Seleccione una Subcategoría
                                            </option>
                                            {subcategories.list.map(
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
                                        </div>
                                      </div>
                                      <div hidden className="sm:col-span-1">
                                        <span className="block text-sm font-medium text-gray-700 my-2">
                                          Agregar Inventario
                                        </span>
                                        <div className="mt-2">
                                          <label className="inline-flex items-center">
                                            <Field
                                              type="radio"
                                              className="form-radio text-sky-600 focus:ring-sky-500"
                                              name="inventary"
                                              id="inventary"
                                              checked={
                                                inventary === true
                                                  ? true
                                                  : false
                                              }
                                              value="true"
                                              onClick={() => {
                                                setInventary(true);
                                                values.quantity = '';
                                              }}
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                              Si
                                            </span>
                                          </label>
                                          <label className="inline-flex items-center ml-6">
                                            <Field
                                              type="radio"
                                              className="form-radio text-sky-600 focus:ring-sky-500"
                                              name="inventary"
                                              id="inventary"
                                              checked={
                                                inventary === false
                                                  ? true
                                                  : false
                                              }
                                              value="false"
                                              onClick={() =>
                                                setInventary(false)
                                              }
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                              No
                                            </span>
                                          </label>
                                        </div>
                                      </div>
                                      <span hidden>
                                        {inventary === true ? (
                                          <div className="sm:col-span-1">
                                            <div className="mt-1">
                                              <MyTextInput
                                                label="Cantidad"
                                                name="quantity"
                                                type="number"
                                                autoComplete="off"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                              />
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="sm:col-span-1">
                                            <div className="mt-1">&nbsp;</div>
                                          </div>
                                        )}
                                      </span>
                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Costo de Envió"
                                            name="costOfShopping"
                                            type="number"
                                            autoComplete="off"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>

                                      <div hidden className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Impuesto"
                                            name="taxes"
                                            type="number"
                                            value="0"
                                            autoComplete="off"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>

                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Tiempo de Envió"
                                            name="deliveryTime"
                                            type="text"
                                            autoComplete="off"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>

                                      <div className="sm:col-span-1">
                                        <span className="block text-sm font-medium text-gray-700 my-2">
                                          Agregar Oferta
                                        </span>
                                        <div className="mt-2">
                                          <label className="inline-flex items-center">
                                            <Field
                                              type="radio"
                                              className="form-radio text-sky-600 focus:ring-sky-500"
                                              name="isOffer"
                                              id="isOffer"
                                              checked={
                                                isOffer === true ? true : false
                                              }
                                              value="true"
                                              onChange={handleChangeOff}
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                              Si
                                            </span>
                                          </label>
                                          <label className="inline-flex items-center ml-6">
                                            <Field
                                              type="radio"
                                              className="form-radio text-sky-600 focus:ring-sky-500"
                                              name="isOffer"
                                              id="isOffer"
                                              checked={
                                                isOffer === false ? true : false
                                              }
                                              value="false"
                                              onChange={handleChangeOff}
                                              onClick={() =>
                                                (values.offer = '')
                                              }
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                              No
                                            </span>
                                          </label>
                                        </div>
                                      </div>

                                      {isOffer && (
                                        <div className="sm:col-span-1">
                                          <div className="mt-1">
                                            <MyTextInput
                                              label="Oferta"
                                              name="offer"
                                              type="number"
                                              autoComplete="off"
                                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                          </div>
                                        </div>
                                      )}

                                      <div className="relative sm:col-span-3 my-2">
                                        <div
                                          className="absolute inset-0 flex items-center"
                                          aria-hidden="true"
                                        >
                                          <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center">
                                          <span className="px-2 bg-white text-sm text-gray-500">
                                            Detalle del Producto
                                          </span>
                                        </div>
                                      </div>

                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Característica"
                                            name="label"
                                            id="label"
                                            autoComplete="off"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Descripción"
                                            name="value"
                                            id="value"
                                            autoComplete="off"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <label>&nbsp;</label>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (
                                                values.label !== '' &&
                                                values.value !== ''
                                              ) {
                                                dispatch(
                                                  addLabels({
                                                    label: values.label,
                                                    value: values.value,
                                                  })
                                                );

                                                setError(false);
                                              }

                                              values.label = '';
                                              values.value = '';
                                            }}
                                            className="h-10  text-sm text-cblue-500  rounded-md w-full bg-blue-100 hover:bg-cblue-500 hover:text-white"
                                          >
                                            Agregar
                                          </button>
                                        </div>
                                      </div>

                                      <div className="sm:col-span-3">
                                        <div className="mt-1">
                                          <table className="min-w-full  table-auto shadow-md rounded-3xl">
                                            <thead className="bg-gray-100">
                                              <tr>
                                                <th
                                                  scope="col"
                                                  className="min-w-[12rem] py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
                                                >
                                                  Etiqueta
                                                </th>
                                                <th
                                                  scope="col"
                                                  className="min-w-[12rem] py-3.5 pr-3 text-left  text-sm font-semibold text-gray-900"
                                                >
                                                  Valor
                                                </th>
                                                <th
                                                  scope="col"
                                                  className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                                ></th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                              {labels.length > 0 && (
                                                <>
                                                  {labels.map(
                                                    (l: any, index: any) => (
                                                      <tr key={index}>
                                                        <td className="whitespace-nowrap font-bold py-4 pr-3 text-sm  px-3 text-gray-600">
                                                          {l.label}
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                                                          {l.value}
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                          <button
                                                            type="button"
                                                            onClick={() => {
                                                              dispatch(
                                                                deleteLabel(
                                                                  index
                                                                )
                                                              );
                                                            }}
                                                          >
                                                            <TrashIcon className="text-gray-600 h-6" />
                                                          </button>
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                                </>
                                              )}
                                            </tbody>
                                          </table>
                                          {error && (
                                            <p className="mt-2 text-sm text-red-600">
                                              Ingrese por lo menos una
                                              característica por ejemplo: talla,
                                              color, etc.
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Payment */}
                                </div>

                                {/* Order summary */}
                              </div>
                            </section>
                          </div>

                          <>
                            <br />
                            <div className="sm:col-span-12 w-full">
                              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                Carga de Imágenes
                              </h1>
                              <p className="mt-2 text-sm text-gray-500">
                                Agrega las imágenes que identificaran al
                                producto
                              </p>
                              {errorImage && (
                                <p className="mt-2 text-sm  text-red-600">
                                  Ingrese por lo menos una imagen para el
                                  producto
                                </p>
                              )}
                            </div>
                            <div className="sm:col-span-12 h-full w-full my-6">
                              <Images setImageIsLoading={setImageIsLoading} />
                              {imageIsLoading === true && setErrorImage(false)}
                              {/* <div className="relative  h-full overflow-hidden">
                             
                            </div> */}
                            </div>
                            <div className="sm:col-span-12 w-full">
                              <button
                                type="button"
                                onClick={() => {
                                  setOpen(false);
                                }}
                                className="bg-gray-100 w-full  h-12 rounded-lg text-gray-700 hover:bg-gray-200 font-semibold"
                              >
                                CANCELAR
                              </button>
                              <button
                                type="submit"
                                disabled={imageIsLoading}
                                className="bg-cblue-500 w-full my-4  font-semibold h-12 rounded-lg text-white"
                              >
                                GUARDAR
                              </button>
                            </div>
                          </>
                          {/* FORM TO PRODUCT DETAIL */}
                        </Form>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
