import { useSubCategory } from '@hooks/useSubCategory';
import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import {
  selectFilterProducts,
  selectSubCategoryId,
} from '@redux/states/filterProductsSlice';
import endPoints from '@services/api';
import { classNames } from '@utils/class-names';
import { useEffect, useState } from 'react';
import { LoadingPage, LoadingSubCategory } from '../loading';
import ScrollButtons from '../scroll-buttons';

export interface SubCategoryResponse {
  categoriesId: number;
  id: number;
  name: string;
  status: string;
  createdAt: Date;
}

export const TabsSubCategories = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector(selectFilterProducts);

  const { subCategory, isLoading } = useSubCategory(
    categoryId,
    endPoints.subCategories.getsubcategories(categoryId)
  );
  const [selectCategory, setSelectCategory] = useState(0);

  const handlerSubCategoryId = (subCategoryId: string) => {
    setSelectCategory(Number(subCategoryId));
    dispatch(selectSubCategoryId(subCategoryId));
  };

  useEffect(() => {
    setSelectCategory(0);
    dispatch(selectSubCategoryId(''));
  }, [categoryId]);

  if ((subCategory?.length === 0 && !isLoading) || subCategory === undefined) {
    return <></>;
  }

  return (
    <ScrollButtons variationButton="round">
      <nav className="flex space-x-3 py-4 px-2 lg:px-8" aria-label="Tabs">
        {isLoading && <LoadingSubCategory />}
        {subCategory?.map((subCat: SubCategoryResponse) => (
          <button
            key={subCat.id}
            className={classNames(
              subCat.id === selectCategory
                ? 'text-gray-800 bg-slate-100 border-yellow-500 border-dashed border-2'
                : 'bg-slate-100 border-2 border-transparent text-gray-700 hover:text-gray-700',
              'whitespace-nowrap flex py-1 px-2 font-medium text-sm rounded-3xl'
            )}
            onClick={() => handlerSubCategoryId(String(subCat.id))}
          >
            {subCat.name}
          </button>
        ))}
      </nav>
    </ScrollButtons>
  );
};
