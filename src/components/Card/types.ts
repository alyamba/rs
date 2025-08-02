import type { PokeData } from '../../api/types';

export type CardProps = {
  item: PokeData;
  selectedPokemons: PokeData[];
  setSelectedPokemons: React.Dispatch<React.SetStateAction<PokeData[]>>;
};
