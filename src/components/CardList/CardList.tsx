import { Component } from 'react';
import type { QueryResult } from '../../App';
import { Card } from '../';

type Props = {
  items: QueryResult[];
};

export class CardList extends Component<Props> {
  render() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row border border-blue-100 p-2">
          <p className="flex-1">Name</p>
          <p className="flex-3">Description</p>
        </div>
        {this.props.items.map((item: QueryResult) => (
          <Card
            key={item.name}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    );
  }
}
