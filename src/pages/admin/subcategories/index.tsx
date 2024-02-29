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
import { Form, Formik, yupToFormErrors } from 'formik';
import AdminLayout from 'layouts/AdminLayout';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getSessionStorage from 'utils/get-session-storage';
import FormSubCategory from './components/FormSubCategory';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Table from './components/Table';

const SubCategories = () => {
  const { user } = useAppSelector(selectAuth);
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [fileName, setFileName] = useState('');
  const [scategories, setScategories] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const tableRef = useRef(null);

  const subcategories = useSelector((state: any) => state.subcategory);
  const openMd = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();

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
    let index = e.target.selectedIndex;
    setFileName(e.target[index].text);
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-8 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">
                Sub-Categorías
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Administra las sub-categorías de los productos
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <DownloadTableExcel
                filename={fileName}
                sheet="Sub-Categorías"
                currentTableRef={tableRef.current}
              >
                <button
                  type="button"
                  className="inline-flex mx-2 items-center justify-center rounded-md border border-transparent bg-cblue-500 px-4 py-2 text-sm font-medium text-white shadow- hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
                >
                  Descargar
                </button>
              </DownloadTableExcel>
              <button
                type="button"
                disabled={category > 0 ? false : true}
                onClick={() => {
                  dispatch(showModal(false)); //false to not show the delete form
                  dispatch(activeSubCategory({ id: 0, name: '' }));
                }}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-cblue-500 px-4 py-2 text-sm font-medium text-white shadow- hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-cblue-500 focus:ring-offset-2 sm:w-auto"
              >
                Nuevo
              </button>
            </div>
          </div>
          <div className="bg-white w-full h-auto   border-rounded px-6 rounded-md shadow-2xl shadow-gray-300">
            <div className="p-1 bg-white rounded-lg    ">
              <div className="w-full bg-white mx-auto ">
                <div className=" mt-2">
                  <div className="min-w-full overflow-x-auto lg:h-full min-h-full sm:h-full overflow-hidden rounded-lg">
                    {/* form to search categories */}

                    {/* table of categories */}

                    <div className="w-full py-4  text-left  text-sm font-semibold text-gray-900">
                      <select
                        name="categoryId"
                        className="col-span-6 md:col-span-3 border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 mt-1 block  pl-3 pr-10 py-2 text-base sm:text-sm rounded-md"
                        onChange={() => {
                          getSubCategories(event);
                        }}
                      >
                        <option value="">Seleccione una Categoría</option>
                        {categories.map(
                          ({ id, name }: { id: any; name: any }) => (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <Table data={subcategories.list} tableRef={tableRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /End r eplace */}

        <Notifications message={message} show={show} setShow={setShow} />
      </div>
      <Modal open={openMd.show} setOpen={undefined}>
        <FormSubCategory
          setMessage={setMessage}
          setShow={setShow}
          category={category}
        />
      </Modal>
    </AdminLayout>
  );
};

export default SubCategories;
