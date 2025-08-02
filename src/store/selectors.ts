import type { RootState } from './store';

export const selectPokemons = (state: RootState) => state.app.pokemons;
