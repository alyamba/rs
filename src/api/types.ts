export type PokeData = {
  name: string;
  data: {
    height: number;
    weight: number;
    types: string[];
    isDefault: boolean;
    imgUrl: string;
  };
  id: number;
};
