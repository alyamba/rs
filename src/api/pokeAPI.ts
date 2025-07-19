import type { PokeData } from './types';

export const getAllPokeData = async (): Promise<PokeData[]> => {
  const limit = 24;

  const urls = Array.from({ length: limit }).map(
    (_, id: number) => `https://pokeapi.co/api/v2/pokemon/${id + 1}`
  );

  const responses = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      return {
        name: data.name,
        data: {
          height: data.height,
          weight: data.weight,
          imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        },
        id: data.id,
      };
    })
  );

  return responses;
};

export const getPokeData = async (searchQuery: string): Promise<PokeData[]> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${searchQuery}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  return [
    {
      name: data.name,
      data: {
        height: data.height,
        weight: data.weight,
        imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      },
      id: data.id,
    },
  ];
};
