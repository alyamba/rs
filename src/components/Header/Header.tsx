import { useState, type ChangeEvent, type FC } from 'react';
import type { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ value, onSearch }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-4 w-full">
        <input
          name="search"
          data-testid="search-input"
          className="p-4 border-2 border-yellow-200 focus:outline-yellow-300 flex-1 rounded-xl text-l"
          type="text"
          placeholder="I'm searching..."
          value={inputValue}
          onChange={handleChangeInputValue}
        />

        <button
          onClick={handleSearch}
          data-testid="search-button"
          className="cursor-pointer py-4 px-8 bg-yellow-200 hover:bg-yellow-300 text-yellow-950 text-l font-semibold rounded-xl shadow-lg"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};
