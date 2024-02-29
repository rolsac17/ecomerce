import { MySelect } from '@common/MySelect';
import { MyTextInput } from '@common/MyTextInput';
import DataTable from '@components/DataTable';
import Modal from '@components/Modal';
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
import { useDispatch, useSelector } from 'react-redux';
import Table from './components/Table';
import { useStatesByCountry } from '@hooks/useStatesByCountry';
import { useCountries } from '@hooks/useCountries';
import { useCitiesByState } from '@hooks/useCitiesByState';
import getSessionStorage from 'utils/get-session-storage';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const Sellers = () => {
  const { user } = useAppSelector(selectAuth);
  const [category, setCategory] = useState(0);
  const [auxcategory, setAuxCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);
  const [auxsubCategory, setAuxSubCategory] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [categories, setCategories] = useState([]);
  const [scategories, setScategories] = useState([]);
  const [warehousesId, setWarehousesId] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [filter, setFilter] = useState<any[]>([]);
  const [auxwh, setAuxWh] = useState('');
  const [users, setUsers] = useState([]);
  const tableRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const subcategories = useSelector((state: any) => state.subcategory);
  const openMd = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();

  const [idState, setIdState] = useState<string>('');
  const { countries } = useCountries(endPoints.address.getCountries);
  const { states } = useStatesByCountry(
    endPoints.address.getStateByCountry('1')
  );

  const { cities } = useCitiesByState(
    idState,
    endPoints.address.getCitiesByState(idState)
  );

  const handleCitiesByStateChange = (idState: string) => {
    setIdState(idState);
  };

  useEffect(() => {
    if (user !== null) {
      fetch(endPoints.reports.getUsers('SELLER_USER'), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setUsers(dat.content.Users);
          } else {
            setUsers([]);
          }
        });
    }
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

    filter.forEach((f: any, index) => {
      if (index === 0) {
        url += `?${f.clave}${f.filtro}`;
      } else {
        url += `&${f.clave}${f.filtro}`;
      }
    });

    if (user !== null) {
      fetch(endPoints.reports.getUsers('SELLER_USER') + url, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setUsers(dat.content.Users);
          } else {
            setUsers([]);
          }
        });
    }
  };

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-8 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">
                Vendedores
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Listado global de usuarios tipo vendedor
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <DownloadTableExcel
                filename="Vendedores"
                sheet="usuarios"
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
                {' '}
                <div className="bg-white w-full h-auto   border-rounded px-6 rounded-lg py-2 shadow-2xl shadow-gray-300">
                  <div className="p-1 bg-white rounded-lg    ">
                    <div className="w-full bg-white mx-auto ">
                      <div className=" mt-2">
                        <div className="min-w-full overflow-x-auto lg:h-full min-h-full sm:h-full overflow-hidden rounded-lg">
                          {/* form to search categories */}

                          {/* table of categories */}

                          <div className="w-full grid grid-cols-1 gap-y-6 gap-x-6 items-start sm:grid-cols-12  lg:gap-x-8">
                            <select
                              name="warehouseId"
                              onChange={(e: any) => {
                                handleCitiesByStateChange(e.target.value);
                                Filters('stateId=', e.target.value);
                              }}
                              className="appearance-none block col-span-4 border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-sky-600 focus:border-sky-600"
                            >
                              <option value="">Selecciona Departamento</option>
                              {states.map(
                                ({ id, name }: { id: any; name: any }) => (
                                  <option key={id} value={id}>
                                    {name}
                                  </option>
                                )
                              )}
                            </select>

                            <select
                              name="categoryId"
                              className="appearance-none block col-span-4 border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-sky-600 focus:border-sky-600"
                              onChange={(e) => {
                                Filters('cityId=', e.target.value);
                              }}
                            >
                              <option value="">Selecciona Municipio</option>
                              {cities.map(
                                ({ id, name }: { id: any; name: any }) => (
                                  <option key={id} value={id}>
                                    {name}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <br></br>
                          <br></br>
                          <Table data={users} tableRef={tableRef} />
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
      </div>
    </AdminLayout>
  );
};

export default Sellers;
