import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
} from 'react';
import {
  ErrorBoundary,
  ErrorButton,
  ErrorFallback,
  Header,
  Main,
} from './components';
import { getAllPokeData, getPokeData } from './api/pokeAPI';
import type { PokeData } from './api/types';

export const App: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [queryResults, setQueryResults] = useState<PokeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const results = await getAllPokeData();
      setQueryResults(results);
      localStorage.setItem('searchQuery', '');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(String(error));
        setError(`${error}`);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSearchData = useCallback(async (searchQuery: string) => {
    setLoading(true);
    setError(undefined);

    try {
      const results = await getPokeData(searchQuery);
      setQueryResults(results);
      localStorage.setItem('searchQuery', searchQuery);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(String(error));
        setError(`${error}`);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedQuery = localStorage.getItem('searchQuery') || '';
    setSearchQuery(storedQuery);

    if (storedQuery) {
      fetchSearchData(storedQuery);
    } else {
      fetchAllData();
    }
  }, [fetchAllData, fetchSearchData]);

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = useCallback(() => {
    const formattedSearchQuery = searchQuery.trim().toLowerCase();

    if (formattedSearchQuery) {
      fetchSearchData(formattedSearchQuery);
    } else {
      fetchAllData();
    }
  }, [fetchAllData, fetchSearchData, searchQuery]);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className="flex flex-col items-center justify-start gap-8 p-20 h-screen w-full">
        <Header
          value={searchQuery}
          onChangeValue={handleChangeInputValue}
          onSearch={handleSearchClick}
        />

        <div className="flex justify-end w-full">
          <ErrorButton />
        </div>

        <Main loading={loading} queryResults={queryResults} error={error} />
      </div>
    </ErrorBoundary>
  );
};
