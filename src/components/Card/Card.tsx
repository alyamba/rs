import { useState, type FC } from 'react';
import type { PokeData } from '../../api/types';
import { Loading } from '../Loading';
import { useNavigate, useSearchParams } from 'react-router';

export const Card: FC<PokeData> = ({ id, name, data }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleCardClick = () => {
    const currentPage = searchParams.get('page') || 1;
    navigate(`pokemon/${id}/?page=${currentPage}`);
  };

  return (
    <div
      className="flex flex-col shadow-lg/10 rounded-xl text-blue-950 hover:cursor-pointer hover:shadow-lg/15"
      onClick={handleCardClick}
    >
      <div className="relative h-[250px] w-[250px]">
        {!imageLoaded && <Loading />}

        <div className="h-full flex items-center justify-center">
          <img
            src={data.imgUrl}
            alt={name}
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
            {name.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};
