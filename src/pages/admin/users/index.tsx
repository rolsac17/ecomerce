import Notifications from '@common/Notifications';
import { NavTabs, TableUserAdmin } from '@components/admin/users';
import Modal from '@components/Modal';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useGetUsers } from '@hooks/useGetUsers';
import endPoints from '@services/api';
import AdminLayout from 'layouts/AdminLayout';

import React, { useEffect, useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import FormUser from './components/FormUser';
import InformationUser from './components/InformationUser';

const Users = () => {
  const [admin, setAdmin] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [userss, setUserss] = useState([]);
  const [active, setActive] = useState({});
  const [type, setType] = useState('ADMINISTRATOR');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const tableRef = useRef(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {}, [active]);

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="max-w-7xl mx-auto  sm:px-6 md:px-3">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="rounded-2x rounded-md md:rounded-lg">
            <div className="py-8 sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-3xl font-semibold text-gray-900">
                  Usuarios
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Lleva el control de los usuarios dependiendo su tipo
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <DownloadTableExcel
                  filename="usuarios"
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
                {admin && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(true);
                      setActive({});
                    }}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-cblue-500 px-4 py-2 text-sm font-medium text-white shadow- hover:bg-cblue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Nuevo
                  </button>
                )}
              </div>
            </div>
            <div className="py-5">
              <div className="">
                <div className="bg-white w-full h-auto   border-rounded px-6 rounded-md shadow-2xl shadow-gray-300">
                  <div className="p-1 bg-white rounded-lg    ">
                    <div className="w-full bg-white mx-auto ">
                      <div className=" mt-2">
                        <div className="min-w-full overflow-x-auto lg:h-full min-h-full sm:h-full overflow-hidden rounded-lg">
                          <NavTabs
                            setAdmin={setAdmin}
                            setType={setType}
                            type={type}
                            setUserss={setUserss}
                            setActive={setActive}
                            userss={userss}
                            setOpen={setOpen}
                            setOpenDesc={setOpenDesc}
                            setShow={setShow}
                            setMessage={setMessage}
                            tableRef={tableRef}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FormUser
            open={open}
            type={type}
            setOpen={setOpen}
            setUserss={setUserss}
            setActive={setActive}
            active={active}
            setShow={setShow}
            setMessage={setMessage}
            message={message}
          />
          <InformationUser
            open={openDesc}
            active={active}
            setOpen={setOpenDesc}
          />
        </div>
        {/* /End r eplace */}

        <Notifications message={message} show={show} setShow={setShow} />
      </div>
    </AdminLayout>
  );
};

export default Users;
