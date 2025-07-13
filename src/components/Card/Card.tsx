import { Component } from 'react';
import type { QueryResult } from '../../App';

export class Card extends Component<QueryResult> {
  render() {
    const { name, description } = this.props;

    return (
      <div className="flex flex-row border border-blue-100 p-2">
        <p className="flex-1">{name}</p>
        <p className="flex-3">{description}</p>
      </div>
    );
  }
}
