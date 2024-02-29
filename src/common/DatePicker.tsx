import { ErrorMessage, useField, useFormikContext } from 'formik';
import React, { useState } from 'react';
import DateView, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  label: string;
  name: string;
  type?: 'date';
  col?: string;
  [x: string]: any;
}

export const DatePicker = ({ label, col, ...props }: Props) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <div className={col}>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <DateView
          locale="es"
          dateFormat="dd/MM/yyyy"
          className="mt-1 bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full pl-10 p-2.5"
          id={props.name}
          {...field}
          {...props}
          selected={field.value && new Date(field.value)}
          onChange={(val) => setFieldValue(props.name, val)}
        />
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <ErrorMessage name={props.name} className="mt-2 text-sm text-red-600" />
      </div>
    </div>
  );
};
