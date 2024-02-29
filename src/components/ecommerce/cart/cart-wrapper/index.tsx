import { ArrowCircleLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';

interface Props {
  titlePrincipal: string;
  goToStore?: boolean;
}
export const CartWrapper: React.FC<Props> = ({
  children,
  titlePrincipal,
  goToStore,
}) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {titlePrincipal}
          </h1>
          {goToStore && (
            <Link href={'/'} passHref>
              <a className="inline-flex md:max-w-none justify-center items-center rounded-md border border-transparent bg-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-greenBlue focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <ArrowCircleLeftIcon className="h-6 w-6 mr-4" />
                Ir a la tienda
              </a>
            </Link>
          )}
        </div>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {children}
        </div>
      </div>
    </div>
  );
};
