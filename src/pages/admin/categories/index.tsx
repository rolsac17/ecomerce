import AdminLayout from 'layouts/AdminLayout';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Form, Formik, yupToFormErrors } from 'formik';
import { MyTextInput } from '@common/MyTextInput';
import Modal from '@components/Modal';
import endPoints from '@services/api';
import Table from './components/Table';
import FormCategorie from './components/FormCategorie';
import Notifications from '@common/Notifications';
import getSessionStorage from 'utils/get-session-storage';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const Categories = () => {
  const { user } = useAppSelector(selectAuth);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');
  const tableRef = useRef(null);

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
                Categorías
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Administra las categorías de los productos
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              {' '}
              <DownloadTableExcel
                filename="Categorías"
                sheet="Categorías"
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
                onClick={() => {
                  setOpen(true);
                  setActive(false);
                  setName('');
                  setId(0);
                }}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-cblue-500 px-4 py-2 text-sm font-medium text-white shadow- hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
              >
                Nuevo
              </button>
            </div>

            <Notifications message={message} show={show} setShow={setShow} />
          </div>

          <div className="bg-white w-full h-auto   border-rounded px-6 rounded-md shadow-2xl shadow-gray-300">
            <div className="p-1 bg-white rounded-lg    ">
              <div className="w-full bg-white mx-auto ">
                <div className=" mt-2">
                  <div className="min-w-full overflow-x-auto lg:h-full min-h-full sm:h-full overflow-hidden rounded-lg">
                    {/* form to search categories */}

                    {/* table of categories */}
                    <Table
                      setId={setId}
                      setOpen={setOpen}
                      setActive={setActive}
                      setName={setName}
                      categories={categories}
                      setCategories={setCategories}
                      tableRef={tableRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /End r eplace */}
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormCategorie
          setShow={setShow}
          setOpen={setOpen}
          setMessage={setMessage}
          name={name}
          id={id}
          active={active}
          getCategories={getCategories}
        />
      </Modal>
    </AdminLayout>
  );
};

export default Categories;
