import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { AllPokemonsApiResponse } from '../../store';
import type { SerializedError } from '@reduxjs/toolkit';

export type MainProps = {
  data: AllPokemonsApiResponse | undefined;
  loading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  currentPage: number;
  onChangeCurrentPage: (value: number) => void;
};
