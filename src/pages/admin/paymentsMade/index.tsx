import AdminLayout from "layouts/AdminLayout";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Form, Formik, yupToFormErrors } from "formik";
import { MyTextInput } from "@common/MyTextInput";
import Modal from "@components/Modal";
import endPoints from "@services/api";
import Table from "./components/table";

const PaymentsMade = () => {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
  }, []);

  return (
    <AdminLayout title={""} pageDescription={""}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-8 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">Pago realizados</h1>
              <p className="mt-2 text-sm text-gray-700">
                Historial de pagos realizados a los vendedores
              </p>
            </div>
          </div>
          <div className="mx-4 mt-4 rounded-2xl border-1 border-gray-50  border-rounded  h-auto shadow-sm  ring-gray-100 sm:-mx-6 md:mx-0 md:rounded-lg">
            <div>
                <Table/>
            </div>
          </div>
        </div>
        {/* /End r eplace */}
      </div>
    </AdminLayout>
  );
};

export default PaymentsMade;
