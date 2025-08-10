import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { allPokemonsApiResponse } from '../../store';
import type { SerializedError } from '@reduxjs/toolkit';

export type MainProps = {
  data: allPokemonsApiResponse | undefined;
  loading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  currentPage: number;
  onChangeCurrentPage: (value: number) => void;
};
