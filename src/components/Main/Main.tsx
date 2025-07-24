import { type FC } from 'react';
import { CardList } from '../CardList';
import { Loading } from '../Loading';
import type { MainProps } from './types';

export const Main: FC<MainProps> = ({ loading, error, queryResults }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="pb-20">
      <CardList items={queryResults} />
    </div>
  );
};
