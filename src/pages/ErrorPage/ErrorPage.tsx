import { type FC } from 'react';
import pokemonError from '../../assets/pokemonError.gif';
import { Link } from 'react-router';

export const ErrorPage: FC = () => {
  return (
    <div className="w-screen h-screen bg-[#dfb698] relative overflow-hidden">
      <img
        src={pokemonError}
        alt="pokemonError"
        className="absolute w-full h-auto object-cover z-1 opacity-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="w-auto absolute z-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-center gap-4">
        <div className="text-7xl sm:text-9xl font-bold">404</div>
        <div className="text-4xl sm:text-5xl">Page Not Found</div>
        <Link
          to="/"
          className="border-blue-950 cursor-pointer py-4 px-8 rounded-xl text-lg bg-sky-950 text-white hover:shadow-lg"
          data-testid="go-home-button"
        >
          HOME
        </Link>
      </div>
    </div>
  );
};
