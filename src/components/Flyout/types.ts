import type { PokeData } from '../../api/types';

export type FlyoutProps = {
  selectedPokemons: PokeData[];
  setSelectedPokemons: React.Dispatch<React.SetStateAction<PokeData[]>>;
};
