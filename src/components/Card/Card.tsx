import { useState, type ChangeEvent, type FC } from 'react';
import { Loading } from '../Loading';
import { useNavigate, useSearchParams } from 'react-router';
import type { CardProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, removePokemon, selectPokemons } from '../../store';
import { useGetPokemonByIdQuery } from '../../store/api';

export const Card: FC<CardProps> = ({ pokemonName }) => {
  const { data, isLoading, error } = useGetPokemonByIdQuery(pokemonName);

  const dispatch = useDispatch();
  const pokemons = useSelector(selectPokemons);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleCardClick = () => {
    if (data) {
      const currentPage = searchParams.get('page') || 1;
      navigate(`pokemon/${data.id}/?page=${currentPage}`);
    }
  };

  const handleClickCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    if (data) {
      if (event.target.checked) {
        dispatch(addPokemon(data));
      } else {
        dispatch(removePokemon(data));
      }
    }
  };

  return (
    <div className="shadow-lg/10 rounded-xl">
      {isLoading ? (
        <Loading />
      ) : error || !data ? (
        <div className="p-4 text-center text-red-500">Error</div>
      ) : (
        <>
          <div className="px-2 py-4">
            <input
              type="checkbox"
              onChange={handleClickCheckbox}
              checked={pokemons.map((el) => el.id).includes(data.id)}
            />
          </div>

          <div
            className="flex flex-col text-blue-950 hover:cursor-pointer hover:shadow-lg/15"
            onClick={handleCardClick}
          >
            <div className="relative h-[250px] w-[250px]">
              {!imageLoaded && <Loading />}

              <div className="h-full flex items-center justify-center">
                <img
                  src={data.data.imgUrl}
                  alt={data.name}
                  className={`h-full transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  data-testid="card-image"
                  onLoad={handleImageLoad}
                />
              </div>
            </div>

            <div className="bg-blue-100 p-4 rounded-b-xl w-[250px] flex-1 justify-between">
              <div className="flex flex-col justify-center items-center bg-blue-100 p-4">
                <p className="text-2xl font-semibold" data-testid="card-name">
                  {data.name.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
