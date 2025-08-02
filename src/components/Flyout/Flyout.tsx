import type { FC } from 'react';
import type { FlyoutProps } from './types';
import styles from './Flyout.module.css';

export const Flyout: FC<FlyoutProps> = ({
  selectedPokemons,
  setSelectedPokemons,
}) => {
  const handleClickUnselectAll = () => {
    setSelectedPokemons([]);
  };
  const handleClickDownload = () => {};

  return (
    <div
      className={`${styles.flyout} fixed z-2 w-full bottom-0 flex justify-between py-4 px-20 items-center gap-10 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]`}
    >
      <div className="text-lg">
        {selectedPokemons.length}{' '}
        {selectedPokemons.length === 1
          ? 'pokemon is selected'
          : 'pokemons are selected'}
      </div>

      <div className="flex gap-4">
        <button
          className="p-2 border rounded cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={handleClickUnselectAll}
        >
          Unselect all
        </button>

        <button
          className="p-2 border rounded cursor-pointer border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          onClick={handleClickDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};
