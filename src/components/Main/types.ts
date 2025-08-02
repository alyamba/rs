import type { PokeData } from '../../api/types';

export type MainProps = {
  loading: boolean;
  error?: string;
  queryResults: PokeData[];
  totalPages: number;
  currentPage: number;
  onChangeCurrentPage: (value: number) => void;
  selectedPokemons: PokeData[];
  setSelectedPokemons: React.Dispatch<React.SetStateAction<PokeData[]>>;
};
