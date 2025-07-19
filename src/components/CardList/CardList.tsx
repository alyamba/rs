import { Component } from 'react';
import { Card } from '../';
import type { PokeData } from '../../api/types';

type CardListProps = {
  items: PokeData[];
};

export class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row border border-blue-100 p-2">
          <p className="flex-1">Name</p>
          <p className="flex-3">Id</p>
        </div>

        {this.props.items.map((item: PokeData) => (
          <Card key={item.id} name={item.name} id={item.id} data={item.data} />
        ))}
      </div>
    );
  }
}
