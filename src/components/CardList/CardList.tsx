import { type FC } from 'react';
import { Card } from '../';
import type { PokeData } from '../../api/types';
import type { CardListProps } from './types';

export const CardList: FC<CardListProps> = ({
  items,
  selectedPokemons,
  setSelectedPokemons,
}) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-12"
      data-testid="cards-container"
    >
      {items.map((item: PokeData) => (
        <Card
          key={item.id}
          item={item}
          selectedPokemons={selectedPokemons}
          setSelectedPokemons={setSelectedPokemons}
        />
      ))}
    </div>
  );
};
