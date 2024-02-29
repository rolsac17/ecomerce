import AdminLayout from 'layouts/AdminLayout';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Form, Formik, yupToFormErrors } from 'formik';
import { MyTextInput } from '@common/MyTextInput';
import Modal from '@components/Modal';
import endPoints from '@services/api';
import Notifications from '@common/Notifications';
import OrderDetail from './components/OrderDetail';
import { ExclamationIcon } from '@heroicons/react/outline';
import { MySelect } from '@common/MySelect';
import { fetchData } from 'helpers/fetchData';
import Cards from './components/Cards';
import getSessionStorage from 'utils/get-session-storage';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const WarrantlyIssues = () => {
  const { user } = useAppSelector(selectAuth);
  //hook to show/hide the modal
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [openD, setOpenD] = useState(false);

  //hook to save the order active
  const [active, setActive] = useState<any>({ detail: [] });

  //hook to save the orders
  const [orders, setOrders] = useState([]);
  const [warehousesId, setWarehousesId] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  //method use to get all orders
  const getOrders = (id: any) => {
    if (user !== null) {
      fetch(endPoints.shipmentsDelivered, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setOrders(dat.content);
          } else {
            setOrders([]);
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
          if (warehouses.length === 1) {
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e: any) => {
    getOrders(e.target.value);
  };

  useEffect(() => {
    getWarehouses();
    getOrders('');
  }, []);
  return (
    <AdminLayout title={''} pageDescription={''}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6  md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4 -z-0 sm:px-6 lg:px-8 ">
          <div className=" py-5 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">
                Productos con problemas de garantia
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Marca los productos retornados por problemas de garantia
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
            <br />
          </div>
          <div className="w-full my-8">
            {/* <select
              name="warehousesId"
              id="warehousesId"
              className=" w-80 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block text-base sm:text-sm rounded-md"
              onChange={handleChange}
            >
              <option value="">Seleccione un almacen</option>
              {warehouses.map(({ id, name }: { id: any; name: any }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select> */}
          </div>
          
          <Cards
            setOpen={setOpen}
            setOpenD={setOpenD}
            setActive={setActive}
            orders={orders}
            setOrders={setOrders}
          />

          <OrderDetail
            setOpen={setOpen}
            open={open}
            active={active}
            getOrders={getOrders}
            setShoww={setShow}
            setMessage={setMessage}
          />
          <Notifications message={message} show={show} setShow={setShow} />
        </div>
        {/* /End r eplace */}
      </div>
      <Modal open={openD} setOpen={setOpenD}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Anular pedido
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                esta seguro que desea anular el pedido # {active.id}, despues de
                realizar esta accion, el pedido desaparecera de todas las
                opciones del sistema
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {}}
          >
            Desactivar
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => setOpenD(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default WarrantlyIssues;
