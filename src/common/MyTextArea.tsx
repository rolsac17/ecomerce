import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { classNames } from '@utils/class-names';
import { ErrorMessage, useField } from 'formik';
import React from 'react';

interface Props {
  label: string;
  name: string;
  rows?: 3 | number;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  optional?: string;
  col?: string;
  [x: string]: any;
  autoComplete?: 'off' | 'on';
}

export const MyTextArea = ({ label, col, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className={col}>
      <div className="flex justify-between">
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <span id="phone-description" className="text-sm text-gray-500">
          {props.optional}
        </span>
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <textarea
          {...field}
          {...props}
          className={classNames(
            meta.touched && meta.error
              ? 'pr-10 border-red-300 text-red-900 placeholder-red-300  focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300   placeholder-gray-400  focus:ring-sky-600 focus:border-sky-600',
            'appearance-none block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm'
          )}
          autoComplete="off"
        />
        {meta.touched && meta.error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <ErrorMessage
        name={props.name}
        component="p"
        className="mt-2 text-sm text-red-600"
      />
    </div>
  );
};
