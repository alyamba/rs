import { type FC } from 'react';
import { CardList } from '../CardList';
import { Loading } from '../Loading';
import type { MainProps } from './types';
import { Pagination } from '../Pagination';
import { Outlet } from 'react-router';
import { useGetAllPokemonsQuery } from '../../store/api';

export const Main: FC<MainProps> = ({ currentPage, onChangeCurrentPage }) => {
  const { data, isLoading, error } = useGetAllPokemonsQuery(currentPage);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <div className="p-4 text-center text-red-500">Error</div>;
  }

  const handleChangePage = (page: number) => {
    onChangeCurrentPage(page);
  };

  return (
    <div className="flex gap-8 justify-between w-full">
      <div className="pb-20 flex flex-col gap-12 w-full">
        <CardList pokemons={data.data} />
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onChangePage={handleChangePage}
        />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
