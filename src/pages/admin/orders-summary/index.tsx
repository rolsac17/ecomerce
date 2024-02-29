import AdminLayout from 'layouts/AdminLayout';
import React, { useRef, useState } from 'react';
import { Form, Formik, yupToFormErrors } from 'formik';
import Table from './components/table';
import { ScaleIcon } from '@heroicons/react/solid';
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function OrdersSummary() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('');
  const tableRef = useRef(null);


  const onChange = (e: any) => {
    setStatus(e.target.value);
  };

  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-4 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">
                Resumen de Pedidos
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Genera un resumen de pedidos realizados por medio de tu enlace
                personal.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <DownloadTableExcel
                filename="Reporte de pedidos"
                sheet="vendedores"
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
          <div className="mx-4 mt-4 rounded-2xl border-1 border-gray-50  border-rounded  h-auto   ring-gray-100 sm:-mx-6 md:mx-0 md:rounded-lg">
            <div>
              <div className="w-full grid grid-cols-1 gap-y-6 gap-x-6 items-start sm:grid-cols-12  lg:gap-x-8">
                {/* <input
                  placeholder="Buscar"
                  className="appearance-none block col-span-12 border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
                /> */}

                <div className="col-span-4">
                  <select
                    name="status"
                    className=" focus:ring-sky-600 focus:border-sky-600 appearance-none block w-full border border-gray-200 px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm "
                    onChange={() => onChange(event)}
                  >
                    <option value="">Seleccione un Estado</option>
                    <option value="SEND">Enviados</option>
                    {/* <option value="DELIVERED">Entregados</option> */}
                    <option value="RETURNED">Retornados</option>
                  </select>
                </div>
              </div>
              <Table tableRef={tableRef} status={status} />
            </div>
          </div>
        </div>
        {/* /End r eplace */}
      </div>
    </AdminLayout>
  );
}
