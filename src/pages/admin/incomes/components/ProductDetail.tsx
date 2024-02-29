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
import { FC, Fragment, useEffect, useState } from 'react';
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
import { Props } from '@headlessui/react/dist/types';
import getSessionStorage from 'utils/get-session-storage';
import Images from './Images';
import { selectAuth } from '@redux/states/Auth';
import { useAppSelector } from '@redux/app/hooks';
import FormError from '@common/FormError';

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  income: any;
  incomeId: any;
  warehousesId: any;
  setProducts: any;
  setDetails: any;
  isEdit: any;
  categorie: any;
}

const ProductDetail: FC<props> = ({
  open,
  setOpen,
  income,
  incomeId,
  warehousesId,
  setProducts,
  setDetails,
  categorie,
  isEdit,
}) => {
  const { user } = useAppSelector(selectAuth);
  const [categories, setCategories] = useState<any[]>([]);
  const [isOffer, setIsOffer] = useState(false);
  const [inventary, setInventary] = useState(false);
  const [error, setError] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [scategory, setScategory] = useState(0);
  const [category, setCategory] = useState(0);
  const [stop, setStop] = useState(false);
  const step = useSelector((state: any) => state.ui.incomeForm);
  const incomeImages = useSelector((state: any) => state.income.images);
  const active = useSelector((state: any) => state.income.product);
  const labels = useSelector((state: any) => state.income.labels);
  const subcategories = useSelector((state: any) => state.subcategory);
  const [enabled, setEnabled] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [showErrorForm, setShowErrorForm] = useState(false);
  const dispatch = useDispatch();
  let initial = {};
  const handleChangeIn = (e: any) => {
    setInventary(e.target.value === 'true' ? true : false);
  };

  const handleChangeOff = (e: any) => {
    setIsOffer(e.target.value === 'true' ? true : false);
  };
  const handleSubCategoriesByCategories = (id: string) => {
    getSubCategories(id, 0, false);
  };

  //action to save a new product
  const saveIncome = (data: any) => {
    const endpoint = '/warehouse/products';
    sendData({ method: 'POST', endpoint, body: data })
      .then((data) => {
        getProducts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //get Product by code and warehouse
  const getProduct = (code: any) => {
    fetchData({
      endpoint: endPoints.incomes.getProduct(warehousesId, code),
    })
      .then((data) => {
        if (data.content) {
          setEnabled(true);
          const {
            internalId,
            costOfShipping,
            deadline,
            deliveryTime,
            description,
            details,
            images,
            inventary,
            isOffer,
            name,
            offer,
            price,
            searchField,
            status,
            stock,
            quantity,
            subcategory,
            taxes,
          } = data.content;

          let lbs: any[] = [];

          details.forEach((d: any) => {
            const { label, value } = d;
            lbs.push({
              label: label,
              value: value,
            });
          });

          let product = {
            warehousesId: warehousesId,
            incomeId: incomeId,
            internalId: internalId,
            name: name,
            description: description,
            price: price,
            quantity: stock,
            categoryId: subcategory.category.id,
            images: images,
            isOffer: isOffer,
            offer: offer,
            costOfShipping: costOfShipping,
            inventary: inventary,
            taxes: 0,
            deadline: deadline,
            deliveryTime: deliveryTime,
            subcategoryId: subcategory.id,
            details: lbs,
          };

          dispatch(activeProduct(product));
          setCategory(subcategory.category.id);
          cargarSelects(subcategory.category.id, subcategory.id);
        } else {
          setEnabled(false);
          setScategory(0);
        }
      })
      .catch((err) => {
        console.error(err);
        setEnabled(false);
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
  const getProducts = () => {
    fetchData({
      endpoint: `/warehouse/income/${incomeId}`,
    })
      .then((data) => {
        let dat = [];
        setOpen(false);
        const { content } = data;
        const { detail } = content;

        dat.push(detail);
        setDetails(detail);

        dat = detail;
        setDetails(detail);

        let p: any[] = [];
        dat.forEach((d: any) => {
          p.push(d.Product);
        });

        setProducts(p);
      })
      .catch((err) => {
        console.error(err);
      });
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
            setScategory(subcategory);
            //
          } else {
          }
        });
    }
  };

  const cargarSelects = (category: any, subcategory: any) => {
    setStop(false);
    if (stop === false) {
      getSubCategoriess(category, subcategory);
    } else {
      setScategory(subcategory);
    }

    return true;
  };

  const updateProduct = (v: any) => {
    let product = {
      warehousesId: warehousesId,
      incomeId: incomeId,
      internalId: v.internalId,
      name: v.name,
      description: v.description,
      price: v.price,
      quantity: v.stock,
      categoryId: v.categoryId,
      images: v.images,
      isOffer: v.isOffer,
      offer: v.offer,
      costOfShipping: v.costOfShipping,
      inventary: v.inventary,
      taxes: 0,
      deadline: v.deadline,
      deliveryTime: v.deliveryTime,
      subcategoryId: v.subcategoryId,
      details: v.productDetail,
    };

    dispatch(activeProduct(product));
  };

  useEffect(() => {
    if (isEdit) {
      setEnabled(true);
      getProduct(active.internalId);
    } else {
      setCategory(0);
      setScategory(0);
      setEnabled(false);
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => {
      setShowErrorForm(false);
    }, 7000);
  }, [showErrorForm]);

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
                      warehousesId: warehousesId,
                      incomeId: incomeId,
                      internalId: active ? active.internalId : '',
                      name: active ? active.name : '',
                      description: active ? active.description : '',
                      price: active ? active.price : '',
                      quantity: active ? active.stock : '',
                      categoryId: category > 0 ? category : '',
                      label: '',
                      value: '',
                      images: incomeImages,
                      productDetail: labels,
                      isOffer: isOffer,
                      offer: active ? active.offer : '',
                      costOfShipping: active ? active.costOfShipping : '',
                      inventary: inventary,
                      taxes: active ? 0 : 0,
                      deadline: active
                        ? active.deadline
                        : moment().add(1, 'years'),
                      deliveryTime: active ? active.deliveryTime : '',
                      subcategoryId: scategory > 0 ? scategory : '',
                    }}
                    onSubmit={(values: any) => {
                      values.income = incomeId;
                      values.price = parseFloat(values.price);
                      values.quantity = parseFloat(values.quantity);
                      values.offer = parseFloat(values.offer);
                      values.costOfShipping = parseFloat(values.costOfShipping);
                      values.taxes = 0;
                      values.categoryId = parseInt(values.categoryId);
                      values.subcategoryId = parseInt(values.subcategoryId);
                      values.productDetail = labels;
                      values.images = incomeImages;
                      values.isOffer = isOffer;
                      values.inventary = inventary;

                      if (labels.length > 0) {
                        setError(false);
                        if (incomeImages.length > 0) {
                          setErrorImage(false);
                          saveIncome(values);
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
                      quantity:
                        inventary === true
                          ? Yup.number()
                              .positive('El campo debe ser mayor a cero')
                              .required('El campo es requerido')
                          : Yup.string(),
                      categoryId: Yup.string().required(
                        'El campo es requerido'
                      ),
                      offer:
                        isOffer === true
                          ? Yup.number()
                              .positive('El campo debe ser mayor a cero')
                              .required('El campo es requerido')
                              .max(100, 'El valor no puede ser mayor a 100')
                          : Yup.string(),
                      costOfShipping: Yup.string().required(
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
                    {({
                      handleChange,
                      handleBlur,
                      values,
                      setFieldValue,
                      isValid,
                    }) => (
                      <>
                        <span hidden>{(values.categoryId = category)}</span>

                        <span hidden>
                          {values.offer > 0
                            ? values.offer
                            : (values.offer = '')}
                        </span>
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
                                            type="text"
                                            autoComplete="off"
                                            onBlur={() => {
                                              handleBlur;
                                              getProduct(values.internalId);
                                            }}
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
                                            type="number"
                                            autoComplete="off"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          />
                                        </div>
                                      </div>

                                      <div className="sm:col-span-1">
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
                                              onChange={() => {
                                                handleChange;
                                                setInventary(true);
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
                                              onChange={() => {
                                                handleChange;
                                                setFieldValue('quantity', '');
                                                setInventary(false);
                                              }}
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                              No
                                            </span>
                                          </label>
                                        </div>
                                      </div>

                                      {inventary === true ? (
                                        <div className="sm:col-span-1">
                                          <div className="mt-1">
                                            <MyTextInput
                                              label="Cantidad"
                                              name="quantity"
                                              type="number"
                                              autoComplete="off"
                                              onKeyDown={() => {
                                                updateProduct(values);
                                                handleChange;
                                              }}
                                              onKeyUp={() => {
                                                updateProduct(values);
                                                handleChange;
                                              }}
                                              onBlur={() => {
                                                updateProduct(values);
                                                handleChange;
                                              }}
                                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="sm:col-span-1">
                                          <div className="mt-1">&nbsp;</div>
                                        </div>
                                      )}

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
                                        <div className="mt-1">
                                          <MySelect
                                            name="subcategoryId"
                                            label="Sub-Categorías"
                                            col="col-span-6 md:col-span-3"
                                            onChange={(e: any) => {
                                              handleChange(e);
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

                                      <div className="sm:col-span-1">
                                        <div className="mt-1">
                                          <MyTextInput
                                            label="Costo de Envió"
                                            name="costOfShipping"
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
                                              onChange={(e: any) => {
                                                handleChange;
                                                handleChangeOff(e);
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
                                              name="isOffer"
                                              id="isOffer"
                                              checked={
                                                isOffer === false ? true : false
                                              }
                                              value="false"
                                              onChange={(e: any) => {
                                                handleChange;
                                                setFieldValue('offer', '');
                                                handleChangeOff(e);
                                              }}
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
                                              label="Oferta (%)"
                                              name="offer"
                                              type="number"
                                              onChange={(e: any) => {
                                                setFieldValue(
                                                  'offer',
                                                  e.target.value
                                                );
                                                handleChange;
                                              }}
                                              onBlur={() =>
                                                updateProduct(values)
                                              }
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
                            <div className="sm:col-span-12 h-full w-full my-6">
                              {showErrorForm === true && (
                                <div className="text-red-500 p-4 bg-red-50">
                                  Hay errores en el formulario. Por favor,
                                  revíselo y vuelva a intentarlo.
                                </div>
                              )}
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
                                onClick={() => {
                                  if (!isValid) {
                                    setShowErrorForm(true);
                                  }
                                }}
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
};

export default ProductDetail;
