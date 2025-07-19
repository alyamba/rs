import { Component } from 'react';
import type { Props } from './types';
import pokemonLogo from '../../assets/pokemonLogo.svg';

export class Header extends Component<Props> {
  render() {
    const { value, onChangeValue, onSearch } = this.props;

    return (
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-row justify-center items-center gap-2 text-4xl font-bold w-full">
          <p className="inline-block">Hello, It is</p>
          <img src={pokemonLogo} alt="Pokemon" className="h-12" />
          <p>API</p>
        </div>

        <div className="flex gap-4 w-full">
          <input
            name="search"
            className="p-4 border-2 border-yellow-200 focus:outline-yellow-300 flex-1 rounded-xl text-l"
            type="text"
            placeholder="I'm searching..."
            value={value}
            onChange={onChangeValue}
          />

          <button
            onClick={onSearch}
            className="cursor-pointer py-4 px-8 bg-yellow-200 hover:bg-yellow-300 text-yellow-950 text-l font-semibold rounded-xl shadow-lg"
          >
            SEARCH
          </button>
        </div>
      </div>
    );
  }
}
