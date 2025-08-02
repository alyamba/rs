import { type FC } from 'react';
import { CardList } from '../CardList';
import { Loading } from '../Loading';
import type { MainProps } from './types';
import { Pagination } from '../Pagination';
import { Outlet } from 'react-router';

export const Main: FC<MainProps> = ({
  loading,
  error,
  queryResults,
  totalPages,
  currentPage,
  onChangeCurrentPage,
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  const handleChangePage = (page: number) => {
    onChangeCurrentPage(page);
  };

  return (
    <div className="flex gap-8 justify-between w-full">
      <div className="pb-20 flex flex-col gap-12 w-full">
        <CardList pokemons={queryResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handleChangePage}
        />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
