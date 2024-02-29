import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { classNames } from '@utils/class-names';
import { ErrorMessage, useField } from 'formik';
import React from 'react';

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  col?: string;
  [x: string]: any;
}

export const MySelect = ({ label, col, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className={col}>
      <label
        htmlFor={props.id || props.name}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className={classNames(
          meta.touched && meta.error
            ? 'border-red-300 text-red-900 placeholder-red-300  focus:ring-red-500 focus:border-red-500'
            : ' border-gray-300 focus:outline-none focus:ring-sky-600 focus:border-sky-600',
          'mt-1 block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md'
        )}
      />
      <ErrorMessage
        name={props.name}
        component='p'
        className='mt-2 text-sm text-red-600'
      />
    </div>
  );
};
