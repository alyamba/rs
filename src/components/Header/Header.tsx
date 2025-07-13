import { Component } from 'react';
import type { Props } from './types';

export class Header extends Component<Props, object> {
  render() {
    const { value, onChangeValue, onSearch } = this.props;

    return (
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl">Hello, It is Pokemon API</h1>
        <div>
          <input
            className="p-2"
            type="text"
            placeholder="I'm searching..."
            value={value}
            onChange={onChangeValue}
          />
          <button onClick={onSearch} className="p-2">
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
