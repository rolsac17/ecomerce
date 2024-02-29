import { CardProducts } from '@components/ecommerce/products/card-products';
import { GridProducts } from '@components/ecommerce/products/grid-products';
import { LayoutShopSimple } from 'layouts/LayoutShopSimple';
import { GetServerSideProps, NextPage } from 'next';
import { useProducts } from '@hooks/useProducts';
import endPoints from '@services/api';
import { IProduct } from 'interfaces/IProducts';

interface Props {
  products: IProduct[];
  searchField: string;
  foundProducts: boolean;
}

const SerachPage: NextPage<Props> = ({
  products,
  searchField,
  foundProducts,
}) => {
  return (
    <LayoutShopSimple title={''} pageDescription={''}>
      <div className="max-w-7xl mx-auto sm:px-2 lg:px-8 mt-6 md:mt-8">
        <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Buscar Productos
          </h1>
          {foundProducts ? (
            <p className="mt-2 text-sm text-gray-500">Término: {searchField}</p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              No encontramos ningún produto <span className='text-gray-900'>{searchField}</span>
            </p>
          )}
        </div>
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <GridProducts>
          {products.map((product) => (
            <CardProducts key={product.id} product={product} />
          ))}
        </GridProducts>
      </div>
    </LayoutShopSimple>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query: searchField = '' } = params as { query: string };

  if (searchField.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  const response = await fetch(
    `${endPoints.products.getInitialProdutcs}?searchField=${searchField}`
  );
  const data = await response.json();

  const foundProducts = data?.content?.length > 0;

  // const {products} = await getSearchFieldProduct(searchField);
  return {
    props: {
      // unstable_serialize() array style key
      products: data?.content || [],
      searchField,
      foundProducts,
    },
  };
};

export default SerachPage;
