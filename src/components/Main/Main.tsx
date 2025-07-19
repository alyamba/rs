import { Component } from 'react';
import { CardList } from '../CardList';
import type { PokeData } from '../../api/types';
import { Loading } from '../Loading';

type Props = {
  loading: boolean;
  error?: string;
  queryResults: PokeData[];
};

export class Main extends Component<Props> {
  render() {
    const { loading, error, queryResults } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    }

    return (
      <div className="pb-20">
        <CardList items={queryResults} />
      </div>
    );
  }
}
