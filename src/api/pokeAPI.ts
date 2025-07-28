import type { PokeApiResponse, PokemonResponse } from './types';

const REQUEST_LIMIT = 24;

export const getAllPokeData = async (
  page: number
): Promise<PokeApiResponse> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${REQUEST_LIMIT}&offset=${(page - 1) * REQUEST_LIMIT}`
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const pokemonResponse = await response.json();

  const totalPages = Math.ceil(pokemonResponse.count / REQUEST_LIMIT);
  const pokemons: PokemonResponse[] = pokemonResponse.results;

  const responses = await Promise.all(
    pokemons.map(async (pokemon) => {
      const response = await getPokeData(pokemon.name);

      return response.data[0];
    })
  );

  return { totalPages, data: responses };
};

export const getPokeData = async (
  searchQuery: string
): Promise<PokeApiResponse> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${searchQuery}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  return {
    totalPages: 1,
    data: [
      {
        name: data.name,
        data: {
          height: data.height,
          weight: data.weight,
          imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          isDefault: data.is_default,
          types: data.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
        },
        id: data.id,
      },
    ],
  };
};
