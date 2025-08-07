import { useCallback, type ChangeEvent, type FC } from 'react';
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
import { useStoredItem } from '../../utils';
import { useSelector } from 'react-redux';
import { selectPokemons } from '../../store';

export const HomePage: FC = () => {
  const [currentPage, setCurrentPage] = useStoredItem<number>('page', 1);

  const navigate = useNavigate();

  const pokemons = useSelector(selectPokemons);

  const [searchQuery, setSearchQuery] = useStoredItem<string>(
    'searchQuery',
    ''
  );

  const handleChangeCurrentPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = useCallback(() => {
    // const formattedSearchQuery = searchQuery.trim().toLowerCase();

    setCurrentPage(1);
    navigate(`/?page=1`);
  }, [navigate, setCurrentPage]);

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
          currentPage={currentPage}
          onChangeCurrentPage={handleChangeCurrentPage}
        />
      </div>
      {pokemons.length ? <Flyout /> : null}
    </ErrorBoundary>
  );
};
