export type FormattedPokemonResponse = {
  name: string;
  data: {
    height: number;
    weight: number;
    imgUrl: string;
    isDefault: boolean;
    types: string[];
  };
  id: number;
};

export type PokemonResponse = {
  name: string;
  url: string;
};

export type AllPokemonsApiResponse = {
  totalPages: number;
  data: PokemonResponse[];
};

export const TagTypes = {
  pokemons: 'Pokemons',
  pokemon: 'Pokemon',
} as const;
