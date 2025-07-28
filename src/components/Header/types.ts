import type { ChangeEvent } from 'react';

export type HeaderProps = {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};
