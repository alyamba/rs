import { Component } from 'react';
import type { PokeData } from '../../api/types';

export class Card extends Component<PokeData> {
  render() {
    const { name, id } = this.props;

    return (
      <div className="flex flex-row border border-blue-100 p-2">
        <p className="flex-1">{name}</p>
        <p className="flex-3">{id}</p>
      </div>
    );
  }
}
