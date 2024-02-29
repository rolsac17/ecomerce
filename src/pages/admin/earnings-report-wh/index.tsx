import AdminLayout from "layouts/AdminLayout";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Form, Formik, yupToFormErrors } from "formik";
import { MyTextInput } from "@common/MyTextInput";
import Modal from "@components/Modal";
import endPoints from "@services/api";
import AdminWallet from "./components/adminWallet";
import getSessionStorage from "utils/get-session-storage";
import { selectAuth } from "@redux/states/Auth";
import { useAppSelector } from "@redux/app/hooks";
import { fetchData } from "helpers/fetchData";
import { DownloadTableExcel } from "react-export-table-to-excel";

const EarningsReportWH = () => {
  const { user } = useAppSelector(selectAuth);
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState("");
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [temp, setTemp] = useState([]);
  const tableRef = useRef(null);

  
  useEffect(() => {

    setUserType(user.type)

  }, []);

  const getTotalBalance = (warehouseId: any) => {
    if (user !== null) {
      fetch(endPoints.reports.getTotal(warehouseId), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setTotalBalance(dat.content.balance);
          } else {
            setTotalBalance(0);
          }
        });
    }
  };

  const getTotalPaid = (warehouseId: any) => {
    if (user !== null) {
      fetch(endPoints.reports.getTotalPaid(warehouseId), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setTotalPaid(dat.content.balance);
          } else {
            setTotalPaid(0);
          }
        });
    }
  };

  const getPaymentsMade = () => {
    if (user !== null) {
      fetch(endPoints.reports.getPaymentsMade, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            setTransactions(dat.content);
          } else {
            setTransactions([]);
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
          setTemp(data.content)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getWarehouses();
    getPaymentsMade();
  }, []);

  return (
    <AdminLayout title={""} pageDescription={""}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-8 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">Reporte de actividades por almacén</h1>
              <p className="mt-2 text-sm text-gray-700">
                Monitorea los pedidos realizados, los pagos y los saldos acumulados por almacén en tiempo real.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <DownloadTableExcel
                filename="Reporte Almacenes"
                sheet="Almacenes"
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
          <div className="mx-4 mt-5 rounded-2xl border-1 border-gray-50  border-rounded  h-auto shadow-sm  ring-gray-100 sm:-mx-6 md:mx-0 md:rounded-lg">
            <div>
              {userType === "ADMINISTRATOR" && <AdminWallet tableRef={tableRef} transactions={transactions} />}
            </div>
          </div>
        </div>
        {/* /End r eplace */}
      </div>
    </AdminLayout>
  );
};

export default EarningsReportWH;
