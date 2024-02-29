import Modal from '@components/Modal';
import moment from 'moment';
import React, { Component } from 'react';

export default function Detail({
  open,
  setOpen,
  guide,
  detail,
  total,
  constOfShipping,
  sendAt,
}: {
  open: any;
  setOpen: any;
  guide: any;
  detail: any;
  total: any;
  constOfShipping: any;
  sendAt: any;
}) {
  
  return (
      <div className="space-y-20">
        {/* {orders.map((order) => ( */}
        <div>
          <div className="p-4 shadow w-full bg-gray-50">
            <h3>
              Guía <b>{guide}</b>
            </h3>
            <p className="text-sm text-gray-500">
              Enviado el <b>{moment(sendAt).format('DD/MM/YYYY')}</b>
            </p>
          </div>
          <table className="mt-2 w-full text-gray-500 sm:mt-2">
            <caption className="sr-only">Products</caption>
            <thead className="sr-only  bg-gray-50 text-left text-sm text-gray-500 sm:not-sr-only">
              <tr>
                <th
                  scope="col"
                  className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                >
                  Precio
                </th>
                <th
                  scope="col"
                  className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                >
                  Descuento
                </th>
                <th
                  scope="col"
                  className="hidden py-3 pr-8 font-normal sm:table-cell"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
              {detail &&
                detail.map((d: any, index: any) => (
                  <tr key={index}>
                    <td className="py-6 pr-8 sm:table-cell">{d.quantity}</td>
                    <td className="py-6 pr-8">
                      <div className="flex items-start">
                        {/* <Image
                                src={endPoints.files.download + '/' + d.image}
                                className="col-start-2 col-end-3 sm:col-start-1 sm:row-start-1 sm:row-span-2 w-20 h-20 rounded-lg object-center object-cover sm:w-40 sm:h-40 lg:w-24 lg:h-24"
                                width={5}
                                height={5}
                              /> */}
                        <div>
                          <div className="font-medium text-gray-900">
                            {d.product}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className=" py-6 pr-8 sm:table-cell">
                      {d.price.toFixed(2)}
                    </td>
                    <td className=" py-6 pr-8 sm:table-cell">
                      {d.discount.toFixed(2)}
                    </td>
                    <td className=" py-6 pr-8 sm:table-cell">
                      {(d.quantity * d.price - d.discount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              <tr className="">
                <td className="py-2 pr-8 sm:table-cell"></td>
                <td className="py-2 pr-8"></td>
                <td className=" py-2 pr-8 sm:table-cell"></td>
                <td className=" py-2 pr-8 sm:table-cell">
                  <b>Costo de envío:</b>
                </td>
                <td className=" py-2 pr-8 sm:table-cell">
                  {typeof constOfShipping === 'number' && constOfShipping > 0 && constOfShipping.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 pr-8 sm:table-cell"></td>
                <td className="py-2 pr-8"></td>
                <td className=" py-2 pr-8 sm:table-cell"></td>
                <td className=" py-2 pr-8 sm:table-cell">
                  <b>Total:</b>
                </td>
                <td className=" py-2 pr-8 sm:table-cell">
                  {(typeof total === 'number' && total > 0||
                    typeof constOfShipping === 'number' && constOfShipping > 0)&&
                    (total + constOfShipping).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="bg-cblue-500 text-white p-2 rounded-lg my-6 right-0"
            onClick={() => setOpen(false)}
          >
            Cerrar
          </button>
        </div>
        {/* ))} */}
      </div>
  );
}
