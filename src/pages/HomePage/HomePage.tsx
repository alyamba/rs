import { useCallback, useEffect, type FC } from 'react';
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
import {
  selectPokemons,
  useLazyGetAllPokemonsQuery,
  useLazyGetPokemonByNameQuery,
} from '../../store';

export const HomePage: FC = () => {
  const [currentPage, setCurrentPage] = useStoredItem<number>('page', 1);
  const navigate = useNavigate();

  const pokemons = useSelector(selectPokemons);

  const [searchQuery, setSearchQuery] = useStoredItem<string>(
    'searchQuery',
    ''
  );

  const [
    allPokemonsTrigger,
    {
      data: searchedAllPokemonsData,
      error: searchedAllPokemonsError,
      isFetching: searchedAllPokemonsIsFetching,
    },
  ] = useLazyGetAllPokemonsQuery();

  const [
    pokemonByNameTrigger,
    {
      data: searchedPokemonData,
      error: searchedPokemonError,
      isFetching: searchedPokemonIsFetching,
    },
  ] = useLazyGetPokemonByNameQuery();

  const handleChangeCurrentPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const handleSearchClick = useCallback(
    (value: string) => {
      setSearchQuery(value);

      const formattedSearchQuery = value.trim().toLowerCase();

      if (formattedSearchQuery) {
        pokemonByNameTrigger(formattedSearchQuery);
      } else {
        allPokemonsTrigger(1);
      }

      setCurrentPage(1);
      navigate(`/?page=1`);
    },
    [
      allPokemonsTrigger,
      navigate,
      pokemonByNameTrigger,
      setCurrentPage,
      setSearchQuery,
    ]
  );

  useEffect(() => {
    if (searchQuery.trim().toLowerCase()) {
      pokemonByNameTrigger(searchQuery);
    } else {
      allPokemonsTrigger(currentPage);
    }
  }, [searchQuery, currentPage, pokemonByNameTrigger, allPokemonsTrigger]);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <NavBar />
      <div
        className="flex flex-col items-center justify-start gap-8 p-20 h-full w-full"
        data-testid="main-container"
      >
        <Header value={searchQuery} onSearch={handleSearchClick} />

        <div className="flex justify-end w-full gap-4">
          <ErrorButton />
        </div>

        <Main
          data={searchQuery ? searchedPokemonData : searchedAllPokemonsData}
          loading={
            searchQuery
              ? searchedPokemonIsFetching
              : searchedAllPokemonsIsFetching
          }
          error={searchQuery ? searchedPokemonError : searchedAllPokemonsError}
          currentPage={currentPage}
          onChangeCurrentPage={handleChangeCurrentPage}
        />
      </div>
      {pokemons.length ? <Flyout /> : null}
    </ErrorBoundary>
  );
};
