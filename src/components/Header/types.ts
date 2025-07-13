import type { ChangeEvent } from 'react';

export type Props = {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};
