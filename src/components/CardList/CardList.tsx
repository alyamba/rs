import { type FC } from 'react';
import { Card } from '../';
import type { PokeData } from '../../api/types';
import type { CardListProps } from './types';

export const CardList: FC<CardListProps> = ({ items }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
      data-testid="cards-container"
    >
      {items.map((item: PokeData) => (
        <Card key={item.id} name={item.name} id={item.id} data={item.data} />
      ))}
    </div>
  );
};
