import { useState } from 'react';
import { useSearchParams } from 'react-router';

export const useStoredItem = <T>(key: string, initialValue: T) => {
  // Necessary to check if the page in query is not the same as in LS
  // (we need to use it for the case when the user wants to change page directly in the URL)
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  //

  const storedItem = localStorage.getItem(key) || initialValue;

  let preparedStoredItem = (
    !isNaN(parseInt(storedItem as string)) ? +storedItem : storedItem
  ) as T;

  // After receiving the page in the URL and in the LS we need to compare them
  if (
    key === 'page' &&
    currentPage !== null &&
    currentPage !== preparedStoredItem
  ) {
    preparedStoredItem = +currentPage as T;
  }
  //

  const [item, setItemState] = useState<T>(preparedStoredItem);

  const setItem = (value: T) => {
    setItemState(value);
    localStorage.setItem(key, String(value));
  };

  return [item, setItem] as const;
};
