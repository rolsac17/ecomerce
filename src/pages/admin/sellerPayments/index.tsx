import AdminLayout from 'layouts/AdminLayout';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Form, Formik, yupToFormErrors } from 'formik';
import { MyTextInput } from '@common/MyTextInput';
import Modal from '@components/Modal';
import endPoints from '@services/api';
import Table from './components/table';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const SellerPayments = () => {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState('');
  const tableRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-8 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">
                Pagos a Vendedores
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Realiza los pagos solicitados por los vendedores
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <DownloadTableExcel
                filename="Pagos a vendedores"
                sheet="Pagos"
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
          <div className="rounded-2xl   border-rounded  h-auto  ring-gray-100 md:rounded-lg">
            <div>
              <Table tableRef={tableRef} />
            </div>
          </div>
        </div>
        {/* /End r eplace */}
      </div>
    </AdminLayout>
  );
};

export default SellerPayments;
