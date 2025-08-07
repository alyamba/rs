import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  allPokemonsApiResponse,
  formattedPokemonResponse,
} from '../types';

const REQUEST_LIMIT = 24;
const BASE_URL = 'https://pokeapi.co/api/v2/';

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllPokemons: build.query({
      query: (page) =>
        `pokemon?limit=${REQUEST_LIMIT}&offset=${(page - 1) * REQUEST_LIMIT}`,
      transformResponse: (response): allPokemonsApiResponse => {
        const totalPages = Math.ceil(response.count / REQUEST_LIMIT);
        const pokemons = response.results;

        return { totalPages, data: pokemons };
      },
    }),

    getPokemonById: build.query({
      query: (pokemonId) => `pokemon/${pokemonId}`,
      transformResponse: (response): formattedPokemonResponse => ({
        name: response.name,
        data: {
          height: response.height,
          weight: response.weight,
          imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`,
          isDefault: response.is_default,
          types: response.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
        },
        id: response.id,
      }),
    }),
  }),
});

export const { useGetAllPokemonsQuery, useGetPokemonByIdQuery } = pokemonsApi;
