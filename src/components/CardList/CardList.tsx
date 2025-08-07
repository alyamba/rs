import { type FC } from 'react';
import { Card } from '../';
import type { CardListProps } from './types';

export const CardList: FC<CardListProps> = ({ pokemons }) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-12"
      data-testid="cards-container"
    >
      {pokemons.map((pokemon, id) => (
        <Card key={id} pokemonName={pokemon.name} />
      ))}
    </div>
  );
};
