import { Menu, Transition } from '@headlessui/react';
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  activeSubCategory,
  fetchSubCategories,
} from '@redux/states/subcategoriesSlice';
import uiSlice, { showModal } from '@redux/states/uiSlice';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Table = ({ data, tableRef }: { data: any; tableRef: any }) => {
  let dat = [];
  const [temp, setTemp] = useState([]);
  const [counter, setCounter] = useState(0);

  const uiMd = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();

  //method use for searching on the table
  const filter = (e: any) => {
    setTemp(data);
    let val = e.target.value.toString().toLowerCase();
    let count = 4;
    let keys = Object.keys(data[0]);
    setTemp(
      data.filter((item: any) => {
        for (let i = 0; i < count; i++) {
          if (
            (item[keys[i]] &&
              item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
            !val
          ) {
            return true;
          }
        }
      })
    );
  };

  //for edit o delete a subcategory
  const activeSC = (values: any) => {
    dispatch(activeSubCategory(values));
  };

  //assign the data at temp variable  for use to filter
  useEffect(() => {
    setTemp(data);
  }, [data]);

  return (
    <>
      <table
        className="min-w-full table-auto shadow-sm rounded-3xl "
      >
        <thead>
          <tr className="bg-gray-100">
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Teléfono
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Departamento
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Municipio
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Dirección
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Object.values(temp).map((s: any, index) => (
            <tr key={index} className="bg-white">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div>
                    <div className="font-medium text-gray-900">
                      {`${s.name} ${s.surnames}`}
                    </div>
                    <div className="text-gray-500">{s.email}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600">
                {s.cellPhone}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600">
                {s.state}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600">
                {s.city}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600">
                {s.referenceAddress}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <table
        ref={tableRef}
        hidden
        className="min-w-full table-auto shadow-sm rounded-3xl "
      >
        <thead>
          <tr className="bg-gray-100">
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Email
            </th>
            <th
              scope="col"
              className=" py-3.5 pr-3 text-left px-3 text-sm font-semibold text-gray-900"
            >
              Teléfono
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Object.values(temp).map((s: any, index) => (
            <tr key={index} className="bg-white">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div>
                    <div className="font-medium text-gray-900">
                      {`${s.name} ${s.surnames}`}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600">
                {s.email}
              </td>
              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-normal text-gray-600">
                {s.cellPhone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
