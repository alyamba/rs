import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TagTypes,
  type AllPokemonsApiResponse,
  type FormattedPokemonResponse,
} from '../types';

const REQUEST_LIMIT = 24;
const BASE_URL = 'https://pokeapi.co/api/v2/';

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: [TagTypes.pokemons, TagTypes.pokemon],
  keepUnusedDataFor: 300,
  endpoints: (build) => ({
    getAllPokemons: build.query({
      query: (page: number) =>
        `pokemon?limit=${REQUEST_LIMIT}&offset=${(page - 1) * REQUEST_LIMIT}`,
      transformResponse: (response): AllPokemonsApiResponse => {
        const totalPages = Math.ceil(response.count / REQUEST_LIMIT);
        const pokemons = response.results;

        return { totalPages, data: pokemons };
      },
      providesTags: (result) => {
        const value = [{ type: TagTypes.pokemons, id: 'LIST' }];

        return result
          ? [
              ...value,
              ...result.data.map((pokemon) => ({
                type: TagTypes.pokemons,
                id: pokemon.name,
              })),
            ]
          : value;
      },
    }),

    getPokemonByName: build.query({
      query: (name: string) => `pokemon/${name}`,
      transformResponse: (response): AllPokemonsApiResponse => {
        const pokemons = [
          { name: response.name, url: `${BASE_URL}pokemon/${response.name}` },
        ];

        return { totalPages: 1, data: pokemons };
      },
      providesTags: (result) => {
        const value = [{ type: TagTypes.pokemons, id: 'LIST' }];

        return result
          ? [
              ...value,
              {
                type: TagTypes.pokemons,
                id: result.data[0].name,
              },
            ]
          : value;
      },
    }),

    getPokemonDetails: build.query({
      query: (pokemonId) => `pokemon/${pokemonId}`,
      transformResponse: (response): FormattedPokemonResponse => ({
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
      providesTags: (result) =>
        result ? [{ type: TagTypes.pokemon, id: result.name }] : [],
    }),
  }),
});

export const {
  useLazyGetAllPokemonsQuery,
  useLazyGetPokemonByNameQuery,

  useGetPokemonDetailsQuery,
} = pokemonsApi;
