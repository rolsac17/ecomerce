import { IProduct } from 'interfaces/IProducts';
import Link from 'next/link';
import React from 'react';
import { CardTrendingProduct } from './card-trending-products';

interface Props {
  trendingProducts: IProduct[];
}

export const TrendingProducts: React.FC<Props> = ({ trendingProducts }) => {
  return (
    <section
      aria-labelledby="trending-heading"
      className="bg-gray-50 border-dashed border-y-2 border-slate-200 mt-1"
    >
      <div className="mt-4 mb-8 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
          <h2
            id="trending-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Ofertas
          </h2>
          <Link href={'/offers'}>
            <a className="block text-sm font-semibold text-blue-600 hover:text-blue-500">
              Ver mas<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>

        <div className="mt-4 md:mt-8 relative">
          <div className="relative w-full overflow-x-auto">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
            >
              {trendingProducts.map((product) => (
                <li
                  key={product.id}
                  className="w-64 inline-flex flex-col text-center lg:w-auto"
                >
                  <CardTrendingProduct product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
