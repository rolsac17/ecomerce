import AdminLayout from 'layouts/AdminLayout';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Form, Formik, yupToFormErrors } from 'formik';
import { MyTextInput } from '@common/MyTextInput';
import Modal from '@components/Modal';
import endPoints from '@services/api';
import FormCategorie from './components/FormBank';
import Notifications from '@common/Notifications';
import FormBank from './components/FormBank';
import getSessionStorage from 'utils/get-session-storage';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import Table from './components/Table';

const Banks = () => {
  const { user } = useAppSelector(selectAuth);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');  
  const [disabled, setDisabled] = useState(false);
  const tableRef = useRef(null);

  const getBanks = () => {
    if (user !== null) {
      fetch(endPoints.banks.get, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setBanks(dat.content);
            setDisabled(false);
          }
        });
    }
  };

  useEffect(() => {
    getBanks();
  }, []);

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-8 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">Bancos</h1>
              <p className="mt-2 text-sm text-gray-700">
                Administra los bancos asociados a tu empresa
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
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
          <div className="mx-4 mt-5 rounded-2xl border-1 border-gray-50  bg-gray-100 border-rounded  h-auto shadow-sm  ring-gray-100 sm:-mx-6 md:mx-0 md:rounded-lg">
            <div>
              <div className="">
                <div className="bg-white w-full h-auto border-slate-50  border-rounded p-6">
                  {/* form to search Coupons */}

                  {/* table of Coupons */}
                  <Table
                    setId={setId}
                    setOpen={setOpen}
                    setActive={setActive}
                    setName={setName}
                    banks={banks}
                    setbanks={setBanks}
                    tableRef={tableRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /End r eplace */}
        <Notifications message={message} show={show} setShow={setShow} />
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormBank
          setShow={setShow}
          setOpen={setOpen}
          name={name}
          id={id}
          active={active}
          banks={banks}
          getBanks={getBanks}
          setMessage={setMessage}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      </Modal>
    </AdminLayout>
  );
};

export default Banks;
