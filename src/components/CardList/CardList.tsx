import { type FC } from 'react';
import { Card } from '../';
import type { PokeData } from '../../api/types';
import type { CardListProps } from './types';

export const CardList: FC<CardListProps> = ({ pokemons }) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-12"
      data-testid="cards-container"
    >
      {pokemons.map((pokemon: PokeData) => (
        <Card key={pokemon.id} pokemonData={pokemon} />
      ))}
    </div>
  );
};
