import { classNames } from '@utils/class-names';
import { ErrorMessage, useField } from 'formik';
import React from 'react';

interface Props {
  label: string;
  name: string;
  col?: string;
  [x: string]: any;
}

export const MyCheckbox = ({ label, col, ...props }: Props) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div className={col}>
      <label className="ml-2 block text-sm text-gray-900">
        <input
          type="checkbox"
          {...field}
          {...props}
          className={classNames(
            meta.touched && meta.error
              ? ' border-red-300 text-red-900 focus:ring-red-500'
              : ' border-gray-300 text-sky-600 focus:ring-sky-500',
            'mr-2 h-4 w-4 rounded'
          )}
        />
        {label}
      </label>
      <ErrorMessage
        name={props.name}
        component="p"
        className="mt-2 text-sm text-red-600"
      />
    </div>
  );
};
