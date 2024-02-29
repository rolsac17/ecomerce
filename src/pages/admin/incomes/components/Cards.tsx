/* This example requires Tailwind CSS v2.0+ */
import {
  DotsVerticalIcon,
  PencilAltIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { activeProduct, currentIncome } from '@redux/states/incomeSlice';
import { changeIncomeForm } from '@redux/states/uiSlice';
import endPoints from '@services/api';
import { fetchData } from 'helpers/fetchData';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductDetail from './ProductDetail';

export default function Cards({
  setOpen,
  incomeId,
  setIncome,
  income,
  open,
  warehousesId,
  setShow,
  setMessage,
  addIncome,
  warehouses,
  setWarehousesId,
  setShowErrorForm
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  incomeId: any;
  setIncome: any;
  income: any;
  warehousesId: any;
  setShow: any;
  setMessage: any;
  addIncome: any;
  warehouses: any;
  setWarehousesId: any;
  setShowErrorForm:any;
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [details, setDetails] = useState([]);
  const [category, setCategory] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const doIncome = () => {
    const values = {
      warehousesId: warehousesId,
      comment: 'Ingreso de mercadería',
    };
    warehouses.forEach((w: any) => {
      values.warehousesId = w.id;
    });

    setWarehousesId(values.warehousesId);

    if (incomeId == 0) {
      addIncome(values);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <ul
        role="list"
        className="py-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="flex-1 flex flex-col p-1">
            <button
              onClick={() => {
                doIncome();
                dispatch(
                  activeProduct({
                    product: {},
                    images: [],
                    details: [],
                  })
                );
                setCategory(0);
                setIsEdit(false);
                dispatch(changeIncomeForm(0));
              }}
              className="w-full h-full flex-shrink-0 mx-auto rounded-lg bg-gray-100 hover:bg-gray-600 hover:text-white"
            >
              Nuevo
            </button>
            <h3 className="mt-1 text-gray-900 text-sm font-medium">&nbsp;</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between"></dl>
          </div>
        </li>
        {products.map((p: any, index: any) => (
          <li
            key={p.id}
            className="relative rounded-lg overflow-hidden sm:h-24 md:h-34 lg:h-48"
          >
            {p.images &&
              p.images.map((i: any, index2: any) => (
                <div key={index2}>
                  {i.principal ? (
                    <>
                      <div className="absolute inset-0">
                        <Image
                          className="w-full h-full object-center object-cover rounded-lg"
                          src={endPoints.files.download + '/' + i.key}
                          alt=""
                          layout="fill"
                        />
                      </div>

                      <div className="absolute  text-transparent hover:text-white bg-transparent rounded-bl-lg rounded-br-lg hover:backdrop-filter hover:backdrop-blur sm:flex sm:items-center sm:justify-center md:flex md:items-center md:justify-center sm:inset-y-0 sm:inset-x-auto sm:w-full sm:rounded-tl-lg sm:rounded-br-none sm:flex-col  lg:inset-y-0 lg:inset-x-auto lg:w-full lg:rounded-tl-lg lg:rounded-br-none lg:flex-col lg:items-center">
                        <a
                          onClick={() => {
                            dispatch(changeIncomeForm(0));
                            setOpen(true);
                            setIsEdit(true);
                            dispatch(activeProduct(p));
                          }}
                          className="flex-shrink-0    flex bg-black bg-opacity-0 py-3 px-4  border-opacity-25 rounded-md items-center justify-center text-base font-medium  hover:bg-opacity-10 lg:ml-0 lg:w-full"
                        >
                          <PencilIcon
                            className="mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          Editar
                        </a>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
          </li>
        ))}
      </ul>

      <ProductDetail
        incomeId={incomeId}
        setProducts={setProducts}
        income={income}
        open={open}
        setOpen={setOpen}
        warehousesId={warehousesId}
        setDetails={setDetails}
        categorie={category}
        isEdit={isEdit}
      />
    </>
  );
}
