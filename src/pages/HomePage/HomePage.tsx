import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
} from 'react';
import { useNavigate } from 'react-router';
import {
  ErrorBoundary,
  ErrorButton,
  ErrorFallback,
  Flyout,
  Header,
  Main,
  NavBar,
} from '../../components';
import { getAllPokeData, getPokeData } from '../../api/pokeAPI';
import type { PokeData } from '../../api/types';
import { useStoredItem } from '../../utils';
import { useSelector } from 'react-redux';
import { selectPokemons } from '../../store';

export const HomePage: FC = () => {
  const navigate = useNavigate();

  const pokemons = useSelector(selectPokemons);

  const [searchQuery, setSearchQuery] = useStoredItem<string>(
    'searchQuery',
    ''
  );
  const [currentPage, setCurrentPage] = useStoredItem<number>('page', 1);

  const [queryResults, setQueryResults] = useState<PokeData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const results = await getAllPokeData(currentPage);

      setQueryResults(results.data);
      setTotalPages(results.totalPages);
      setSearchQuery(searchQuery);
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
  }, [currentPage, searchQuery, setSearchQuery]);

  const fetchSearchData = useCallback(
    async (searchQuery: string) => {
      setLoading(true);
      setError(undefined);

      try {
        const results = await getPokeData(searchQuery);

        setQueryResults(results.data);
        setTotalPages(results.totalPages);
        setSearchQuery(searchQuery);
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
    },
    [setSearchQuery]
  );

  const handleChangeCurrentPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  useEffect(() => {
    if (searchQuery) {
      fetchSearchData(searchQuery);
    } else {
      fetchAllData();
    }
  }, []);

  useEffect(() => {
    fetchAllData();
    // Fetch the list of pokemons by changing the current page
  }, [currentPage]);

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

    setCurrentPage(1);
    navigate(`/?page=1`);
  }, [fetchAllData, fetchSearchData, navigate, searchQuery, setCurrentPage]);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <NavBar />
      <div
        className="flex flex-col items-center justify-start gap-8 p-20 h-full w-full"
        data-testid="main-container"
      >
        <Header
          value={searchQuery}
          onChangeValue={handleChangeInputValue}
          onSearch={handleSearchClick}
        />

        <div className="flex justify-end w-full gap-4">
          <ErrorButton />
        </div>

        <Main
          loading={loading}
          queryResults={queryResults}
          totalPages={totalPages}
          error={error}
          currentPage={currentPage}
          onChangeCurrentPage={handleChangeCurrentPage}
        />
      </div>
      {pokemons.length ? <Flyout /> : null}
    </ErrorBoundary>
  );
};
