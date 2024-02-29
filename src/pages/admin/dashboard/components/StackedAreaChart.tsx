import { Dialog, Transition } from '@headlessui/react';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Chart, ReactGoogleChartEvent } from 'react-google-charts';

export const options = {
  colors: ['#027ba6', '#005f8b'],
  animation: {
    startup: true,
    easing: 'linear',
    duration: 400,
  },
};

const StackedAreaChart = () => {
  const { user } = useAppSelector(selectAuth);
  const [data, setData] = useState<any[]>([]);
  const [detail, setDetail] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [stat, setStat] = useState('');

  const chartEvents: ReactGoogleChartEvent[] = [
    {
      eventName: 'select',
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 1) {
          const [selectedItem] = selection;
          const dataTable = chartWrapper.getDataTable();
          const { row, column } = selectedItem;

          let month = '';

          if (dataTable?.getValue(row, 0) === 'ENERO') {
            month = '01';
          } else if (dataTable?.getValue(row, 0) === 'FEBRERO') {
            month = '02';
          } else if (dataTable?.getValue(row, 0) === 'MARZO') {
            month = '03';
          } else if (dataTable?.getValue(row, 0) === 'ABRIL') {
            month = '04';
          } else if (dataTable?.getValue(row, 0) === 'MAYO') {
            month = '05';
          } else if (dataTable?.getValue(row, 0) === 'JUNIO') {
            month = '06';
          } else if (dataTable?.getValue(row, 0) === 'JULIO') {
            month = '07';
          } else if (dataTable?.getValue(row, 0) === 'AGOSTO') {
            month = '08';
          } else if (dataTable?.getValue(row, 0) === 'SEPTIEMBRE') {
            month = '09';
          } else if (dataTable?.getValue(row, 0) === 'OCTUBRE') {
            month = '10';
          } else if (dataTable?.getValue(row, 0) === 'NOVIEMBRE') {
            month = '11';
          } else if (dataTable?.getValue(row, 0) === 'DICIEMBRE') {
            month = '12';
          }

          getDetail(month, dataTable?.getColumnLabel(column));
        }
      },
    },
  ];

  const getDetail = (month: any, status: any) => {
    setStat(status);
    setDetail([]);
    setOpen(true);
    let year = moment().format('YYYY');
    let startDate = moment(`${year}-${month}`)
      .startOf('month')
      .format(`YYYY-MM-DD`);
    let endDate = moment(`${year}-${month}`)
      .endOf('month')
      .format(`YYYY-MM-DD`);

    if (status === 'Entregados') {
      status = 'DELIVERED';
    } else if (status === 'Retornados') {
      status = 'RETURNED';
    } else if (status === 'Enviados') {
      status = 'SEND';
    }

    if (user !== null) {
      fetch(endPoints.dashboard.details(startDate, endDate, status), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setDetail(dat.content);
            setOpen(true);
          }
        });
    }
  };

  const getData = () => {
    if (user !== null) {
      fetch(endPoints.dashboard.graphics, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            let array: any[] = [];

            let data = dat.content;

            array.push(['Mes',  'Retornados', 'Enviados']);
            data.forEach((d: any) => {
              let { month,  returned, sends } = d;
              array.push([month,  returned, sends]);
            });
            setData(array);
          }
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
          chartEvents={chartEvents}
        />
      ) : (
        <p className="text-red-600">No se ha realizado ninguna orden!</p>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-4xl md:px-4 md:my-8 md:align-middle lg:max-w-6xl">
                  <div className="w-full  bg-white p-4">
                    <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">
                      Pedidos {stat}{' '}
                    </h3>
                  </div>
                  <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <table className="min-w-full table-auto  rounded-3xl ">
                      <thead>
                        <tr className="bg-gray-100">
                          <th
                            scope="col"
                            className="py-4 text-left px-3 text-sm font-semibold text-gray-900"
                          >
                            No.Guía
                          </th>
                          <th
                            scope="col"
                            className=" text-left  text-sm font-semibold text-gray-900"
                          >
                            Cliente
                          </th>
                          <th
                            scope="col"
                            className="text-left text-sm font-semibold text-gray-900"
                          >
                            Teléfono
                          </th>
                          <th
                            scope="col"
                            className="text-left text-sm font-semibold text-gray-900"
                          >
                            Dirección
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {detail &&
                          detail.map((c: any, index) => (
                            <tr
                              key={index}
                              className={
                                detail.includes(c) ? 'bg-white' : undefined
                              }
                            >
                              <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium px-3 text-gray-600">
                                {c.guide}
                              </td>
                              <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                                {c.client}
                              </td>
                              <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                                {c.cellPhone}
                              </td>
                              <td className="whitespace-nowrap py-4 pr-3 text-sm font-normal  text-gray-600">
                                {c.address}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="py-10 text-right">
                            <button
                              onClick={() => setOpen(false)}
                              className="bg-gray-300 hover:bg-gray-500  hover:text-white p-4 rounded-md"
                            >
                              Cerrar
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default StackedAreaChart;
