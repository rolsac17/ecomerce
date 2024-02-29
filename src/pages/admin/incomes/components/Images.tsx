/* This example requires Tailwind CSS v2.0+ */
import {
  MailIcon,
  CheckCircleIcon,
  PhoneIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  addImages,
  deleteImage,
  setAsMain,
  updateImage,
} from '@redux/states/incomeSlice';
import endPoints from '@services/api';
import { sendData } from 'helpers/sendData';
import Image from 'next/image';
import { useState } from 'react';
import FormData from 'form-data';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@utils/class-names';

export default function Images({
  setImageIsLoading,
}: {
  setImageIsLoading: any;
}) {
  const formData = new FormData();
  const incomeImages = useSelector((state: any) => state.income.images);
  const active = useSelector((state: any) => state.income.product);
  const dispatch = useDispatch();

  //action to upload a new image
  const uploadLogo = (formData: any, img: any) => {
    const endpoint = '/common/files';
    sendData({ method: 'POST', endpoint, body: formData })
      .then((data) => {
        dispatch(
          updateImage({
            key: data.content.key,
            principal: incomeImages.length ? false : true,
            fileLoading: img,
            load: false,
          })
        );
        console.log(false);
        setImageIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleImage = (e: any) => {
    formData.append('file', e.target.files[0]);

    if (e.target.files[0]) {
      console.log(true);
      setImageIsLoading(true);
      dispatch(
        addImages({
          key: '',
          principal: incomeImages.length ? false : true,
          fileLoading: URL.createObjectURL(e.target.files[0]),
          load: true,
        })
      );
      uploadLogo(formData, URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {incomeImages && (
        <>
          {incomeImages.map((i: any, index: any) => (
            <li
              key={index}
              className={classNames(
                i.principal
                  ? 'col-span-1 cursor-pointer hover:bg-gray-500 hover:text-white relative border-sky-400  border-4 flex flex-col h-48 text-center bg-sky-500 rounded-lg shadow '
                  : 'col-span-1 h-48 relative flex  flex-col text-center bg-white rounded-lg shadow divide-y  divide-gray-200'
              )}
            >
              <div className="flex-1 h-full absolute inset-0   flex flex-col">
                <Image
                  src={
                    i.key
                      ? endPoints.files.download + '/' + i.key
                      : i.fileLoading
                  }
                  alt="Cargar Imagen"
                  layout="fill"
                  className="object-center object-cover  h-full w-full rounded-lg"
                />
              </div>
              <div className="absolute  text-transparent hover:text-white bg-transparent rounded-bl-lg rounded-br-lg hover:backdrop-filter hover:backdrop-blur sm:flex sm:items-center sm:justify-center md:flex md:items-center md:justify-center sm:inset-y-0 sm:inset-x-auto sm:w-full sm:rounded-tl-lg sm:rounded-br-none sm:flex-col  lg:inset-y-0 lg:inset-x-auto lg:w-full lg:rounded-tl-lg lg:rounded-br-none lg:flex-col lg:items-center">
                {i.principal === false && (
                  <a
                    onClick={() => dispatch(setAsMain(index))}
                    className="flex-shrink-0    flex bg-black bg-opacity-0 py-3 px-4  border-opacity-25 rounded-md items-center justify-center text-base font-medium  hover:bg-opacity-10 lg:ml-0 lg:w-full"
                  >
                    <CheckCircleIcon
                      className="mr-3 h-5 w-5"
                      aria-hidden="true"
                    />
                    Principal
                  </a>
                )}
                <a
                  href="#"
                  className="flex-shrink-0    flex bg-black bg-opacity-0 py-3 px-4  border-opacity-25 rounded-md items-center justify-center text-base font-medium  hover:bg-opacity-10 lg:ml-0 lg:w-full"
                  onClick={() => dispatch(deleteImage(index))}
                >
                  <TrashIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                  Eliminar
                </a>
              </div>
            </li>
          ))}
        </>
      )}

      <li className="col-span-1 cursor-pointer  hover:bg-gray-500 hover:text-white relative border-dashed border-4 flex flex-col h-48 text-center bg-gray-50 rounded-lg shadow divide-y divide-gray-200">
        <div className="flex-1 text-center   flex flex-col h-full">
          <label
            htmlFor="desktop-user-photo"
            className="absolute inset-0  w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
          >
            <span>Agregar</span>
            <input
              type="file"
              onChange={handleImage}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
            />
          </label>
        </div>
      </li>
    </ul>
  );
}
