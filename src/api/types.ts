export type PokeData = {
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

export type PokeApiResponse = {
  totalPages: number;
  data: PokeData[];
};
