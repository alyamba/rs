import type { FC } from 'react';
import styles from './Flyout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllPokemons, selectPokemons } from '../../store';

export const Flyout: FC = () => {
  const pokemons = useSelector(selectPokemons);
  const dispatch = useDispatch();

  const handleClickUnselectAll = () => {
    dispatch(removeAllPokemons());
  };

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
    ...pokemons.map((pokemon) => [
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
        {pokemons.length}{' '}
        {pokemons.length === 1
          ? 'pokemon is selected'
          : 'pokemons are selected'}
      </div>

      <div className="flex gap-4">
        <button
          className="p-2 border rounded cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={handleClickUnselectAll}
          data-testid="unselect-all-button"
        >
          Unselect all
        </button>

        <a
          className="p-2 border rounded cursor-pointer border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          download={'pokemons.csv'}
          data-testid="download-button"
          href={URL.createObjectURL(file)}
        >
          Download
        </a>
      </div>
    </div>
  );
};
