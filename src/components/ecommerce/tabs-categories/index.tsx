import { useEffect, useState } from 'react';
import { useCategories } from '@hooks/useCategories';
import endPoints from '@services/api';
import { useAppDispatch } from '@redux/app/hooks';
import { selectCategoryId } from '@redux/states/filterProductsSlice';
import ScrollButtons from '../scroll-buttons';
import { classNames } from '@utils/class-names';
import { LoadingCategory } from '../loading';

export interface Categories {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
}

export const TabsCategories = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useCategories(
    endPoints.categories.getCategories
  );

  const [selectCategory, setSelectCategory] = useState(-1);

  const handlerIdCategory = (idCategory: Categories) => {
    setSelectCategory(idCategory.id);
    dispatch(selectCategoryId(String(idCategory.id)));
  };

  useEffect(() => {
    dispatch(selectCategoryId(''));
  }, []);

  return (
    <ScrollButtons variationButton="large">
      <nav className="flex space-x-4 mx-2 lg:mx-8" aria-label="Tabs">
        {isLoading ? (
          <LoadingCategory />
        ) : (
          <>
            <button
              className={classNames(
                -1 === selectCategory
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm'
              )}
              onClick={() => {
                setSelectCategory(-1), dispatch(selectCategoryId(''));
              }}
            >
              Todas
            </button>
            {categories.map((category: Categories) => (
              <button
                key={category.id}
                className={classNames(
                  category.id === selectCategory
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                  'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm'
                )}
                onClick={() => handlerIdCategory(category)}
              >
                {category.name}
              </button>
            ))}
          </>
        )}
      </nav>
    </ScrollButtons>
  );
};
