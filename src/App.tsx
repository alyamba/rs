import { Component, type ChangeEvent } from 'react';
import { ErrorBoundary, ErrorFallback, Header } from './components';
import { pokeAPI } from './api/pokeAPI';

type QueryResult = {
  name: string;
  description: string;
};

type State = {
  searchQuery: string;
  queryResults: QueryResult[];
  loading: boolean;
  error?: string;
};

export class App extends Component<object, State> {
  state: State = { searchQuery: '', queryResults: [], loading: false };

  componentDidMount(): void {
    const saved = localStorage.getItem('searchQuery') || '';
    this.setState({ searchQuery: saved });
  }

  handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchClick = () => {
    const formattedSearchQuery = this.state.searchQuery.trim().toLowerCase();
    localStorage.setItem('searchQuery', formattedSearchQuery);
    this.fetchResults(formattedSearchQuery);
  };

  async fetchResults(searchQuery: string) {
    this.setState({ loading: true });

    try {
      const queryResults = await pokeAPI(searchQuery);
      console.log('queryResults:', queryResults);
      this.setState({ queryResults, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(String(error));
      }
    }
  }

  render() {
    return (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <div className="flex items-center justify-center">
          <Header
            value={this.state.searchQuery}
            onChangeValue={this.handleChangeInputValue}
            onSearch={this.handleSearchClick}
          />
        </div>
      </ErrorBoundary>
    );
  }
}
