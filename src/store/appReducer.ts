import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FormattedPokemonResponse } from './types';

export interface AppState {
  pokemons: FormattedPokemonResponse[];
}

const initialState: AppState = {
  pokemons: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<FormattedPokemonResponse>) => ({
      ...state,
      pokemons: [...state.pokemons, action.payload],
    }),

    removePokemon: (
      state,
      action: PayloadAction<FormattedPokemonResponse>
    ) => ({
      ...state,
      pokemons: state.pokemons.filter(
        (pokemon: FormattedPokemonResponse) => pokemon.id !== action.payload.id
      ),
    }),

    removeAllPokemons: (state) => ({
      ...state,
      pokemons: initialState.pokemons,
    }),
  },
});

export const { addPokemon, removePokemon, removeAllPokemons } =
  appSlice.actions;

export default appSlice.reducer;
