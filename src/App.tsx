import { Component, type ChangeEvent } from 'react';
import { ErrorBoundary, ErrorFallback, Header, Main } from './components';
import { pokeAPI } from './api/pokeAPI';

export type QueryResult = {
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
    const savedPokemons = localStorage.getItem('foundPokemons') || '';
    const parsedSavedPokemons = JSON.parse(savedPokemons);

    const lastSavedPokemons = parsedSavedPokemons.length
      ? parsedSavedPokemons[parsedSavedPokemons.length - 1].name
      : '';

    this.setState({
      searchQuery: lastSavedPokemons,
      queryResults: parsedSavedPokemons,
    });
  }

  handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchClick = () => {
    const formattedSearchQuery = this.state.searchQuery.trim().toLowerCase();
    this.fetchResults(formattedSearchQuery);
  };

  async fetchResults(searchQuery: string) {
    this.setState({ loading: true, error: undefined });

    try {
      const queryResults = await pokeAPI(searchQuery);

      const localStorageData = localStorage.getItem('foundPokemons');
      const parsedLocalStorageData = localStorageData
        ? JSON.parse(localStorageData)
        : [];

      const foundPokemons = [
        ...parsedLocalStorageData.filter(
          (datum: QueryResult) =>
            !queryResults.some((item: QueryResult) => item.name === datum.name)
        ),
        ...queryResults,
      ];

      this.setState({
        queryResults: foundPokemons,
        loading: false,
        error: undefined,
      });
      localStorage.setItem('foundPokemons', JSON.stringify(foundPokemons));
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
        </div>
      </ErrorBoundary>
    );
  }
}
