import { useEffect, useState, type FC } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { getPokeData } from '../../api/pokeAPI';
import type { PokeData } from '../../api/types';
import { Loading } from '../Loading';
import styles from './CardDetailes.module.css';

export const CardDetails: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const [responseData, setResponseData] = useState<PokeData | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchPokeData = async (pokeId: string) => {
    setLoading(true);
    try {
      const response = await getPokeData(pokeId);
      setResponseData(response.data[0]);
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
  };

  useEffect(() => {
    fetchPokeData(String(params.id));
  }, [params.id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleClickClose = () => {
    const currentPage = searchParams.get('page');
    navigate(`/?page=${currentPage}`);
  };

  return (
    <div
      className={`${styles.cardDetailsContainer} sticky top-12 w-[300px] min-h-[300px]`}
    >
      <button
        className="hover:cursor-pointer text-3xl mx-4 my-2"
        onClick={handleClickClose}
      >
        ×
      </button>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center">{error}</div>
      ) : (
        <div className="p-4">
          <div className="relative h-[280px]">
            {!imageLoaded && <Loading />}

            <div className="h-full flex items-center justify-center">
              <img
                src={responseData?.data.imgUrl}
                alt={responseData?.name}
                className={`h-full w-auto transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                data-testid="card-image"
                onLoad={handleImageLoad}
              />
            </div>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl font-semibold" data-testid="card-name">
                {responseData?.name.toUpperCase()}
              </p>
            </div>

            <div className="flex gap-1 items-center">
              <div className="text-l font-normal">Height: </div>
              <div className="text-l font-bold" data-testid="card-height">
                {(responseData?.data.height || 0) / 10}M
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="text-l font-normal">Weight: </div>
              <div className="text-l font-bold" data-testid="card-weight">
                {(responseData?.data.height || 0) / 10}KG
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="text-l font-normal">Default pokemon: </div>
              <div className="text-l font-bold" data-testid="card-weight">
                {responseData?.data.isDefault ? 'Yes' : 'No'}
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="text-l font-normal">Pokemon types: </div>
              <div className="text-l font-bold" data-testid="card-weight">
                {responseData?.data.types.join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
