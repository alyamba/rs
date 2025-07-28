import type { PokeData } from '../../api/types';

export type MainProps = {
  loading: boolean;
  error?: string;
  queryResults: PokeData[];
  totalPages: number;
  currentPage: number;
  onChangeCurrentPage: (value: number) => void;
};
