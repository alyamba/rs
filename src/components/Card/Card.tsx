import { useState, type ChangeEvent, type FC } from 'react';
import { Loading } from '../Loading';
import { useNavigate, useSearchParams } from 'react-router';
import type { CardProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, removePokemon, selectPokemons } from '../../store';

export const Card: FC<CardProps> = ({ pokemonData }) => {
  const pokemons = useSelector(selectPokemons);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleCardClick = () => {
    const currentPage = searchParams.get('page') || 1;
    navigate(`pokemon/${pokemonData.id}/?page=${currentPage}`);
  };

  const handleClickCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(addPokemon(pokemonData));
    } else {
      dispatch(removePokemon(pokemonData));
    }
  };

  return (
    <div className="shadow-lg/10 rounded-xl">
      <div className="px-2 py-4">
        <input
          type="checkbox"
          onChange={handleClickCheckbox}
          checked={pokemons.map((el) => el.id).includes(pokemonData.id)}
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
              src={pokemonData.data.imgUrl}
              alt={pokemonData.name}
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
              {pokemonData.name.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
