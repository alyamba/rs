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

  const downloadInfo = [
    [
      'id',
      'Pokemon',
      'Height (m)',
      'Weight (kg)',
      'Image URL',
      'Default pokemon',
      'Types',
    ],
    ...selectedPokemons.map((pokemon) => [
      pokemon.id,
      pokemon.name,
      pokemon.data.height / 10,
      pokemon.data.weight / 10,
      pokemon.data.imgUrl,
      pokemon.data.isDefault ? 'Yes' : 'No',
      pokemon.data.types,
    ]),
  ]
    .map((row) => row.join(', '))
    .join('\n');
  const file = new Blob([downloadInfo], { type: 'text/csv' });

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

        <a
          className="p-2 border rounded cursor-pointer border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          onClick={handleClickDownload}
          download={'pokemons.csv'}
          href={URL.createObjectURL(file)}
        >
          Download
        </a>
      </div>
    </div>
  );
};
