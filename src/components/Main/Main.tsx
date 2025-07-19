import { Component } from 'react';
import { CardList } from '../CardList';
import type { PokeData } from '../../api/types';

type Props = {
  loading: boolean;
  error?: string;
  queryResults: PokeData[];
};

export class Main extends Component<Props> {
  render() {
    const { loading, error, queryResults } = this.props;

    if (loading) {
      return <div className="p-4 text-center text-blue-500">Loading...</div>;
    }

    if (error) {
      return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    }

    if (queryResults.length === 0) {
      return (
        <div className="p-4 text-center text-gray-500">No results found.</div>
      );
    }
    return (
      <div>
        <CardList items={queryResults} />
      </div>
    );
  }
}
