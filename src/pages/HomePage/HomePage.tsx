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
import { useDispatch, useSelector } from 'react-redux';
import {
  pokemonsApi,
  selectPokemons,
  TagTypes,
  useLazyGetAllPokemonsQuery,
  useLazyGetPokemonByNameQuery,
} from '../../store';

export const HomePage: FC = () => {
  const [currentPage, setCurrentPage] = useStoredItem<number>('page', 1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      if (value) {
        pokemonByNameTrigger(value);
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
    navigate(`/?page=${currentPage}`);
    if (searchQuery) {
      pokemonByNameTrigger(searchQuery);
    } else {
      allPokemonsTrigger(currentPage);
    }
  }, [
    searchQuery,
    currentPage,
    pokemonByNameTrigger,
    allPokemonsTrigger,
    navigate,
  ]);

  const handleRefetch = () => {
    if (searchQuery) {
      pokemonByNameTrigger(searchQuery);
    } else {
      allPokemonsTrigger(currentPage);
    }
  };

  const handleInvalidateCache = () => {
    dispatch(
      pokemonsApi.util.invalidateTags([{ type: TagTypes.pokemons, id: 'LIST' }])
    );
  };

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <NavBar />
      <div
        className="flex flex-col items-center justify-start gap-8 p-20 h-full w-full"
        data-testid="main-container"
      >
        <Header value={searchQuery} onSearch={handleSearchClick} />

        <div className="flex justify-between w-full gap-4">
          <div className="flex gap-4">
            <button
              className="py-2 px-2 border border-gray-100 bg-gray-50 hover:bg-gray-100 hover:cursor-pointer"
              onClick={handleRefetch}
            >
              Refetch data
            </button>
            <button
              className="py-2 px-2 border border-gray-100 bg-gray-50 hover:bg-gray-100 hover:cursor-pointer"
              onClick={handleInvalidateCache}
            >
              Invalidate cache
            </button>
          </div>

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
