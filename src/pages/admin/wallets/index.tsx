import AdminLayout from "layouts/AdminLayout";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Form, Formik, yupToFormErrors } from "formik";
import { MyTextInput } from "@common/MyTextInput";
import Modal from "@components/Modal";
import endPoints from "@services/api";
import AdminWallet from "./components/adminWallet";
import SellerWallet from "./components/sellerWallet";
import getSessionStorage from "utils/get-session-storage";
import { selectAuth } from "@redux/states/Auth";
import { useAppSelector } from "@redux/app/hooks";

const Wallets = () => {
  const { user } = useAppSelector(selectAuth);
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {

    setUserType(user.type)

  }, []);

  return (
    <AdminLayout title={""} pageDescription={""}>
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Replace with your content */}
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="py-8 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">Wallet</h1>
              <p className="mt-2 text-sm text-gray-700">
                Monitorea y cobra tus ganancias en tiempo real.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
          </div>
          <div className="mx-4 mt-5 rounded-2xl border-1 border-gray-50  border-rounded  h-auto shadow-sm  ring-gray-100 sm:-mx-6 md:mx-0 md:rounded-lg">
            <div>
              {userType === "ADMINISTRATOR" && <AdminWallet />}
              {userType === "SELLER_USER" && <SellerWallet />}
            </div>
          </div>
        </div>
        {/* /End r eplace */}
      </div>
    </AdminLayout>
  );
};

export default Wallets;
