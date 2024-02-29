import { MyTextInput } from '@common/MyTextInput';
import { ExclamationIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import {
  activeSubCategory,
  fetchSubCategories,
  saveSubCategory,
} from '@redux/states/subcategoriesSlice';
import { closeModal } from '@redux/states/uiSlice';
import endPoints from '@services/api';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getSessionStorage from 'utils/get-session-storage';
import * as Yup from 'yup';

const FormSubCategory = ({
  category,
  setMessage,
  setShow,
}: {
  category: any;
  setMessage: any;
  setShow: any;
}) => {
  const { user } = useAppSelector(selectAuth);
  //disabled button to submit data
  const [disabled, setDisabled] = useState(false);

  //manage the state to the UI
  const ui = useSelector((state: any) => state.ui);
  const subcategories = useSelector((state: any) => state.subcategory);
  const active = useSelector((state: any) => state.subcategory.active);
  //manage function states
  const dispatch = useDispatch();

  //save subcategory
  const save = (values: any) => {
    let id = values.id ? active.id : 0;
    if (user !== null) {
      fetch(
        `${endPoints.subCategories.saveSubCategory}${id > 0 ? '/' + id : ''}`,
        {
          method: id == 0 ? 'POST' : 'PUT',
          headers: {
            'Authorization': 'Bearer ' + user.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            categoriesId: parseInt(values.categoriesId),
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            dispatch(saveSubCategory(values));
            dispatch(closeModal());
            getSubCategories();
            setMessage('La subcategoría fue agregada exitosamente!');
            setShow(true);
          } else {
            setMessage(
              'Ha ocurrido un error al intentar guardar la subcategoría'
            );
            setShow(true);
          }
        });
    }
  };

  //remove subcategory
  const desactivateCategory = () => {
    if (user !== null) {
      fetch(`${endPoints.subCategories.saveSubCategory}/${active.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            dispatch(closeModal());
            getSubCategories();

            setMessage('La subcategoría fue eliminada exitosamente!');
            setShow(true);
          }
        });
    }
  };

  const getSubCategories = () => {
    if (user !== null) {
      fetch(endPoints.subCategories.getsubcategories(category), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat.content) {
            dispatch(fetchSubCategories(dat.content));
            setDisabled(false);
          } else {
            dispatch(fetchSubCategories([]));
          }
        });
    }
  };

  return (
    <div>
      {ui.doDelete ? (
        <>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Desactivar Subcategoría
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Esta seguro de desactivar esta subcategoría, después de
                  realizar esta acción, la categoría desaparecerá de todas las
                  opciones del sistema
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                desactivateCategory();
              }}
            >
              Desactivar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => dispatch(closeModal())}
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{
            id: active ? active.id : 0,
            name: active ? active.name : '',
            categoriesId: parseInt(category),
          }}
          onSubmit={(values) => {
            setDisabled(true);
            save(values);
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('El campo es requerido'),
          })}
        >
          {(formik) => (
            <>
              <div className="">
                <div className=" text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Subcategorías
                  </h3>
                  <div className="">
                    <p className="text-sm text-gray-500">
                      Crea o actualiza tus subcategorías
                    </p>
                  </div>
                </div>
              </div>
              <Form className="space-y-14 py-5">
                {/* sub categoria */}

                {/* nombre categoria */}
                <MyTextInput
                  label="Nombre"
                  name="name"
                  type="text"
                  autoComplete="off"
                />
                {/* Campo de Clave */}
                <div></div>
                {}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={disabled}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cblue-500 text-base font-medium text-white hover:bg-cblue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 sm:col-start-2 sm:text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    type="reset"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cblue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => dispatch(closeModal())}
                  >
                    Cancelar
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      )}
    </div>
  );
};

export default FormSubCategory;
