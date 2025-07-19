import { Component, type ChangeEvent } from 'react';
import {
  ErrorBoundary,
  ErrorButton,
  ErrorFallback,
  Header,
  Main,
} from './components';
import { getAllPokeData, getPokeData } from './api/pokeAPI';
import type { PokeData } from './api/types';

type State = {
  searchQuery: string;
  queryResults: PokeData[];
  loading: boolean;
  error?: string;
};

export class App extends Component<object, State> {
  state: State = { searchQuery: '', queryResults: [], loading: false };

  componentDidMount(): void {
    const searchQuery = localStorage.getItem('searchQuery') || '';

    this.setState({ searchQuery });

    if (searchQuery) {
      this.fetchSearchData(searchQuery);
    } else {
      this.fetchAllData();
    }
  }

  handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchClick = () => {
    const formattedSearchQuery = this.state.searchQuery.trim().toLowerCase();

    if (formattedSearchQuery) {
      this.fetchSearchData(formattedSearchQuery);
    } else {
      this.fetchAllData();
    }
  };

  async fetchAllData() {
    this.setState({ loading: true, error: undefined });

    try {
      const queryResults = await getAllPokeData();

      this.setState({
        queryResults,
        loading: false,
        error: undefined,
      });

      localStorage.setItem('searchQuery', '');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        this.setState({ error: error.message, loading: false });
      } else {
        console.error(String(error));
        this.setState({ error: `${error}`, loading: false });
      }
    }
  }

  async fetchSearchData(searchQuery: string) {
    this.setState({ loading: true, error: undefined });

    try {
      const queryResults = await getPokeData(searchQuery);

      this.setState({
        queryResults,
        loading: false,
        error: undefined,
      });

      localStorage.setItem('searchQuery', searchQuery);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        this.setState({ error: error.message, loading: false });
      } else {
        console.error(String(error));
        this.setState({ error: `${error}`, loading: false });
      }
    }
  }

  render() {
    return (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <div className="flex flex-col items-center justify-start gap-6 flex-1 pt-20 pb-20 h-screen">
          <Header
            value={this.state.searchQuery}
            onChangeValue={this.handleChangeInputValue}
            onSearch={this.handleSearchClick}
          />

          <Main
            loading={this.state.loading}
            queryResults={this.state.queryResults}
            error={this.state.error}
          />

          <div className="flex justify-end w-100">
            <ErrorButton />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
