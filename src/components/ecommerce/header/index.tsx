import { TabsCategories } from '../tabs-categories';
import { TabsSubCategories } from '../tabs-sub-categories';
import { NavHeader } from './nav-header';
import SearchHeader from './serach-header';

export interface Props {
  isHome?: boolean;
}
export const Header: React.FC<Props> = ({ isHome }) => {
  return (
    <header className=" bg-blue Header">
      <NavHeader />
      <div className="md:hidden py-4">
        <SearchHeader />
      </div>
      {isHome && (
        <>
          <TabsCategories />
          <TabsSubCategories />
        </>
      )}
    </header>
  );
};
