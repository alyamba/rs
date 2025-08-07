export type formattedPokemonResponse = {
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

export type allPokemonsApiResponse = {
  totalPages: number;
  data: PokemonResponse[];
};
