import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  ShareIcon,
  LinkIcon,
} from '@heroicons/react/outline';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share';
import Link from 'next/link';
import endPoints from '@services/api';
import Notifications from '@common/Notifications';
import getSessionStorage from 'utils/get-session-storage';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';

interface Seller {
  url: string;
}

const ToShare = () => {
  const { user } = useAppSelector(selectAuth);
  const [showSocial, setShowSocial] = useState(false);
  const [urlPage, setUrlPage] = useState<string>();
  const [typeUser, setTypeUser] = useState<any>();
  const [message, setMessage] = useState<string>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let obj = JSON.parse(window.sessionStorage.getItem('auth')!);
    if (obj !== null) {
      if (user.type == 'SELLER_USER') {
        setTypeUser('SELLER_USER');
      } else if (user.type == 'WAREHOUSE_USER') {
        setTypeUser('WAREHOUSE_USER');
      } else {
        setTypeUser(null);
      }
    }
  }, []);

  const getLink = (values: any) => {
    let aux = document.createElement('input');
    aux.setAttribute('Value', values);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    if (values != undefined) {
      setShow(true);
      setMessage('URL copiada');
    } else {
      setShow(true);
      setMessage('Error al copiar URL');
    }
    // alert('URL copiada al portapapeles\n\n' + values);
    setUrlPage(values);
  };

  // let pruebaurl =
  //   'http://localhost:3000/?sellerId=abbb8679-5d2e-45d2-9dff-7f7f0e63d528yy';

  // const getSellerId = (values: string) => {
  //   const params: any = new URLSearchParams(values);
  //   let hola = params.has('?sellerId');
  //   console.log(values);
  //   // console.log('aqui esta', hola);
  // };
  // getSellerId(pruebaurl);

  const urlGenerate = () => {
    let objLocation = window.location;
    if (user !== null) {
      if (user.type !== 'ADMINISTRATOR' || 'CLIENT_USER') {
        fetch(
          user.type == 'SELLER_USER'
            ? `${endPoints.Links.seller}`
            : `${endPoints.Links.warehouse}`,
          {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + user.token,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              domain: objLocation.href,
            }),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            if (result) {
              let newUrl = result.content.url;
              // console.log(result);
              setUrlPage(`${newUrl}`);
            }
            getLink(result.content.Url);
            // setUrlPage(result.content.Url);
          });
      }
    }
  };

  const Ocultar = () => {
    setShowSocial(true);
  };
  // console.log('Este es el link', typeof urlPage, urlPage);

  return (
    <>
      <Popover
        className={`${
          typeUser == 'SELLER_USER'
            ? `ml-4 flow-root text-sm lg:relative lg:ml-8`
            : typeUser == 'WAREHOUSE_USER'
            ? `ml-4 flow-root text-sm lg:relative lg:ml-8`
            : `hidden`
        }`}
      >
        <Popover.Button className="group -m-2 p-2 flex items-center">
          <ShareIcon
            className="flex-shrink-0 h-6 w-6 text-indigo-200 group-hover:text-white"
            aria-hidden="true"
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel
            className={`${
              typeUser !== null
                ? `absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-1 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-40 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5 z-50`
                : `hidden`
            }`}
          >
            <h2 className="sr-only">Compartir Enlace</h2>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  Ocultar();
                  urlGenerate();
                }}
                className="inline-flex items-center px-3 py-2 border border-none  text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <LinkIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Copiar Link
                {/* <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Copiado
                </span> */}
              </button>
            </div>
            <div
              className={`${
                showSocial == false ? `hidden` : `mt-2 text-center`
              }`}
            >
              <FacebookShareButton
                className="mt-2"
                aria-hidden="true"
                url={`${urlPage}`}
                hashtag={'#dropshipping'}
              >
                <a className="text-sm font-medium text-gray-500 hover:text-gray-600 group flex items-center">
                  <FacebookIcon className="mr-2" size={32} round />
                  Facebook
                </a>
              </FacebookShareButton>
            </div>
            <div
              className={`${
                showSocial == false ? `hidden` : `mt-2 text-center`
              }`}
            >
              <WhatsappShareButton
                className=""
                aria-hidden="true"
                url={`${urlPage}`}
                title={'Escribe el contenido Aquí'}
                separator=":: "
              >
                <a className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-600 group flex items-center">
                  <WhatsappIcon className="mr-2" size={32} round />
                  Whatsapp
                </a>
              </WhatsappShareButton>
            </div>
            <div
              className={`${
                showSocial == false ? `hidden` : `mt-2 text-center`
              }`}
            >
              <TwitterShareButton
                className=""
                aria-hidden="true"
                url={`${urlPage}`}
              >
                <a className="text-sm font-medium text-gray-500 hover:text-gray-600 group flex items-center">
                  <TwitterIcon className="mr-2" size={32} round />
                  Twitter
                </a>
              </TwitterShareButton>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <Notifications message={message} show={show} setShow={setShow} />
    </>
  );
};

export default ToShare;
