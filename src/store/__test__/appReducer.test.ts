import { describe, it, expect } from 'vitest';
import type { AppState } from '../appReducer';
import reducer, {
  addPokemon,
  removeAllPokemons,
  removePokemon,
} from '../appReducer';
import { mockPokemonData } from '../../utils';

describe('AppSlice reducer', () => {
  const initialState: AppState = {
    pokemons: [],
  };

  it('Should return the initial state when passed an empty action', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('Should handle addPokemon', () => {
    const previousState: AppState = { pokemons: [] };
    const nextState = reducer(previousState, addPokemon(mockPokemonData));

    expect(nextState.pokemons.length).toBe(1);
    expect(nextState.pokemons[0]).toEqual(mockPokemonData);
  });

  it('Should handle removePokemon', () => {
    const previousState: AppState = { pokemons: [mockPokemonData] };
    const nextState = reducer(previousState, removePokemon(mockPokemonData));

    expect(nextState.pokemons.length).toBe(0);
  });

  it('Should handle removeAllPokemons', () => {
    const previousState: AppState = { pokemons: [mockPokemonData] };
    const nextState = reducer(previousState, removeAllPokemons());

    expect(nextState.pokemons.length).toBe(0);
  });
});
