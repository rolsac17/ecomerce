import { classNames } from '@utils/class-names';

interface Props {
  descriptionButton: string;
  type: 'submit';
  isValid: boolean;
  isSubmitting?: boolean;
  isLoading?: boolean;
}

export const ButtonSubmit = ({
  descriptionButton,
  isValid,
  type,
  isSubmitting,
  isLoading
}: Props) => {
  return (
    <button
      type={type}
      disabled={isSubmitting || !isValid || isLoading}
      className={classNames(
        isSubmitting || !isValid
          ? 'bg-gray-400 opacity-50 cursor-not-allowed'
          : 'w-full bg-blue hover:bg-greenBlue focus:ring-blue',
        'w-full border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 '
      )}
    >
      {isLoading ? 'Processing...' : `${descriptionButton}`}   
    </button>
  );
};
