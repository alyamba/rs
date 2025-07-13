import { Component } from 'react';
import type { QueryResult } from '../../App';
import { CardList } from '../CardList';

type Props = {
  loading: boolean;
  error?: string;
  queryResults: QueryResult[];
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
