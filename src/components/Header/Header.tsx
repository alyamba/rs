import { Component } from 'react';
import type { Props } from './types';

export class Header extends Component<Props> {
  render() {
    const { value, onChangeValue, onSearch } = this.props;

    return (
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl">Hello, It is Pokemon API</h1>
        <div className="border border-blue-200">
          <input
            className="p-2 focus:outline-blue-300"
            type="text"
            placeholder="I'm searching..."
            value={value}
            onChange={onChangeValue}
          />
          <button onClick={onSearch} className="p-2 bg-blue-200">
            Search
          </button>
        </div>
      </div>
    );
  }
}
