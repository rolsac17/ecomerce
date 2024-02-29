import { MySelect } from '@common/MySelect';
import { MyTextInput } from '@common/MyTextInput';
import Notifications from '@common/Notifications';
import DataTable from '@components/DataTable';
import Modal from '@components/Modal';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import {
  activeSubCategory,
  addSubCategory,
  fetchSubCategories,
} from '@redux/states/subcategoriesSlice';
import uiSlice, { showModal } from '@redux/states/uiSlice';
import endPoints from '@services/api';
import { Field, Form, Formik, yupToFormErrors } from 'formik';
import { fetchData } from 'helpers/fetchData';
import AdminLayout from 'layouts/AdminLayout';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useDispatch, useSelector } from 'react-redux';
import getSessionStorage from 'utils/get-session-storage';
import Table from './components/Table';

const SubCategories = () => {
  const { user } = useAppSelector(selectAuth);
  const [category, setCategory] = useState(0);
  const [auxcategory, setAuxCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);
  const [auxsubCategory, setAuxSubCategory] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [categories, setCategories] = useState([]);
  const [scategories, setScategories] = useState([]);
  const [warehousesId, setWarehousesId] = useState('');
  const [show, setShow] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [filter, setFilter] = useState<any[]>([]);
  const [auxwh, setAuxWh] = useState('');
  const [products, setProducts] = useState([]);
  const tableRef = useRef(null);
  const [message, setMessage] = useState('');

  const subcategories = useSelector((state: any) => state.subcategory);
  const openMd = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();

  const getProducts = (filterss: any) => {
    setProducts([]);
    if (user !== null) {
      fetch(endPoints.reports.getProducts + filterss, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setProducts(dat.content);
          } else {
            setProducts([]);
            setFilter([])
          }
        });
    }
  };

  useEffect(() => {
    getProducts('');
  }, []);

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
          if (dat.content) {
            setCategories(dat.content);
          }
        });
    }
  };

  const getSubCategories = (e: any) => {
    setCategory(e.target.value);
    if (user !== null) {
      fetch(endPoints.subCategories.getsubcategories(e.target.value), {
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
            dispatch(fetchSubCategories([]));
          }
        });
    }
  };
  const getWarehouses = () => {
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
    getCategories();
  }, []);

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      Filters('searchField=', event.target.value);
    } else {
      if (event.target.value === '') {
        Filters('searchField=', event.target.value);
      }
    }
  };

  const [isOffer, setIsOffer] = useState(false);

  const Filters = (clave: any, filtro: any) => {
    let filt = {
      clave: clave,
      filtro: filtro,
    };

    if (filter.length > 0) {
      if (!filter.find((f: any) => f.clave === clave)) {
        filter.push(filt);
      } else {
        let index = filter.findIndex((f: any) => f.clave === clave);

        if (filtro === '') {
          filter.splice(index, 1);
        } else {
          filter[index] = filt;
        }
      }
    } else {
      filter.push(filt);
    }

    let url = '';

    filter.forEach((f, index) => {
      if (index === 0) {
        url += `?${f.clave}${f.filtro}`;
      } else {
        url += `&${f.clave}${f.filtro}`;
      }
    });

    url += `&offset=0&limit=100000`;

    if (user !== null) {
      getProducts(url);
    }
  };

  const changeAvailability = (status: any, id: any) => {
    if (user !== null) {
      fetch(`${endPoints.products.changeAvailability(id)}`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          available: status,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            getProducts('');
          }
        });
    }
  };

  const handleChange = (e: any) => {
    setIsOffer(e.target.value === 'true' ? true : false);
    Filters('isOffer=', e.target.value);
  };

  const handleChangeI = (e: any) => {
    setIsAvailable(e.target.value === 'true' ? true : false);
    Filters('status=',e.target.value === 'true' ? 'AVAILABLE' : 'NOT_AVAILABLE');
  };

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-8 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">
                Productos
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Inventario global de productos cargados en la plataforma.
              </p>
            </div>{' '}
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <DownloadTableExcel
                filename="productos"
                sheet="productos"
                currentTableRef={tableRef.current}
              >
                <button
                  type="button"
                  className="inline-flex mx-2 items-center justify-center rounded-md border border-transparent bg-cblue-500 px-4 py-2 text-sm font-medium text-white shadow- hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
                >
                  Descargar
                </button>
              </DownloadTableExcel>
            </div>
          </div>
          <div className="mx-4 mt-5 rounded-2xl border-1 border-gray-50  bg-gray-100 border-rounded  h-auto shadow-sm  ring-gray-100 sm:-mx-6 md:mx-0 md:rounded-lg">
            <div>
              <div className="">
                <div className="bg-white w-full h-auto   border-rounded px-6 rounded-md shadow-2xl shadow-gray-300">
                  <div className="p-1 bg-white rounded-lg    ">
                    <div className="w-full bg-white mx-auto ">
                      <div className="bg-white w-full h-auto border-slate-50  border-rounded p-6">
                        {/* form to search categories */}

                        {/* table of categories */}

                        <div className="w-full grid grid-cols-1 gap-y-6 gap-x-6 items-start sm:grid-cols-12  lg:gap-x-8">
                          <input
                            placeholder="Buscar"
                            className="appearance-none block col-span-12 border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            onKeyDown={handleKeyPress}
                          />
                          {user.type === 'ADMINISTRATOR' && (
                            <select
                              name="warehouseId"
                              onChange={(e) => {
                                setWarehousesId(e.target.value);
                                if (e.target.value === '') {
                                  Filters('warehousesId=', '');
                                } else {
                                  Filters('warehousesId=', e.target.value);
                                }
                              }}
                              className="appearance-none block col-span-4 border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-sky-600 focus:border-sky-600"
                            >
                              <option value="">Selecciona Almacén</option>
                              {warehouses.map(
                                ({ id, name }: { id: any; name: any }) => (
                                  <option key={id} value={id}>
                                    {name}
                                  </option>
                                )
                              )}
                            </select>
                          )}

                          <select
                            name="categoryId"
                            className="appearance-none block col-span-6 border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-sky-600 focus:border-sky-600"
                            onChange={(e) => {
                              getSubCategories(e);
                              Filters('categoryId=', e.target.value);
                            }}
                          >
                            <option value="">Selecciona Categoría</option>
                            {categories.map(
                              ({ id, name }: { id: any; name: any }) => (
                                <option key={id} value={id}>
                                  {name}
                                </option>
                              )
                            )}
                          </select>
                          <select
                            name="subcategoryId"
                            className="appearance-none block col-span-6 border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-sky-600 focus:border-sky-600"
                            onChange={(e) => {
                              Filters('subcategoryId=', e.target.value);
                            }}
                          >
                            <option value="">Selecciona Subcategoría</option>
                            {subcategories.list.map(
                              ({ id, name }: { id: any; name: any }) => (
                                <option key={id} value={id}>
                                  {name}
                                </option>
                              )
                            )}
                          </select>
                          <div className="sm:col-span-3 col-span-4">
                            <span className="block text-sm font-medium text-gray-700 my-2">
                              Producto en Oferta
                            </span>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  className="form-radio text-sky-600 focus:ring-sky-500"
                                  name="isOffer"
                                  id="isOffer"
                                  checked={isOffer === true ? true : false}
                                  value="true"
                                  onChange={handleChange}
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                  Si
                                </span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  className="form-radio text-sky-600 focus:ring-sky-500"
                                  name="isOffer"
                                  id="isOffer"
                                  checked={isOffer === false ? true : false}
                                  value="false"
                                  onClick={handleChange}
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                  No
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="sm:col-span-3 col-span-2">
                            <span className="block text-sm font-medium text-gray-700 my-2">
                              Producto Disponible
                            </span>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  className="form-radio text-sky-600 focus:ring-sky-500"
                                  name="isAvailable"
                                  id="isAvailable"
                                  checked={isAvailable === true ? true : false}
                                  value="true"
                                  onChange={handleChangeI}
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                  Si
                                </span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  className="form-radio text-sky-600 focus:ring-sky-500"
                                  name="isAvailable"
                                  id="isAvailable"
                                  checked={isAvailable === false ? true : false}
                                  value="false"
                                  onChange={handleChangeI}
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                  No
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className=" mt-2">
                          <div className="min-w-full overflow-x-auto lg:h-full min-h-full sm:h-full overflow-hidden rounded-lg">
                            <Table
                              tableRef={tableRef}
                              changeAvailability={changeAvailability}
                              getProducts={getProducts}
                              Filters={Filters}
                              data={products}
                              setMessage={setMessage}
                              setShow={setShow}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default SubCategories;
