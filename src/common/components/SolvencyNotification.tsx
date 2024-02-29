/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import { StopIcon, XIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';

export default function SolvencyNotification() {
  const [show, setShow] = useState(false);
  const [isSolventAccount, setIsSolventAccount] = useState(true);
  const { user } = useAppSelector(selectAuth);

  const getAccountSolvency = () => {
    if (user !== null) {
      if (user.type === 'WAREHOUSE_USER') {
        fetch(endPoints.isSolvent, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((dat) => {
            if (dat.content) {
              const { isSolvent } = dat.content;

              if (isSolvent === false) {
                setShow(true);
              }
            } else {
              setIsSolventAccount(false);
            }
          });
      }
    }
  };

  useEffect(() => {
    getAccountSolvency();
  });

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-11 flex items-start px-4  pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-red-500 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-md text-white font-medium">
                      Advertencia
                    </p>
                    <p className="mt-1 text-sm text-white">
                      Su cuenta está pendiente de pago, por favor proceda a
                      realizar el pago correspondiente, de no ser así su cuenta
                      será desactivada en los próximos 7 días
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon
                        className="h-5 w-5 bg-red-500 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
