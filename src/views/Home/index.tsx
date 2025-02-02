import { Component } from 'react';

import apiService from '../../services/api';
import { Character } from '../../types/apiTypes';
import TopControls from '../../components/TopControls';
import Results from '../../components/Results';

interface HomeState {
  query: string;
  characters: Character[];
  loading: boolean;
  error: string | null;
}

class Home extends Component<object, HomeState> {
  state = {
    query: localStorage.getItem('searchQuery') || '',
    characters: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchCharacters(this.state.query);
  }

  componentWillUnmount() {
    localStorage.setItem('searchQuery', this.state.query);
  }

  fetchCharacters = async (query: string): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const characters = await apiService.fetchCharacters(query);

      if (characters.length === 0) {
        this.setState({ characters: [], loading: false });
        return;
      }

      this.setState({ characters, loading: false });
    } catch (error) {
      this.setState({
        characters: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Something went wrong.',
      });
    }
  };

  handleQueryChange = (query: string): void => {
    this.setState({ query });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    localStorage.setItem('searchQuery', this.state.query);
    this.fetchCharacters(this.state.query);
  };

  render() {
    const { query, characters, loading, error } = this.state;

    return (
      <div className="px-4 py-8">
        <TopControls
          query={query}
          onQueryChange={this.handleQueryChange}
          onSubmit={this.handleSubmit}
        />

        {loading && (
          <div className="flex items-center justify-center w-full h-64">
            <div className="border-t-4 border-green-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center justify-center h-64 text-red-500 text-lg font-semibold text-center">
            {error}
          </div>
        )}

        {!loading && !error && characters.length === 0 && (
          <div className="flex items-center justify-center h-64 text-gray-500 text-lg font-semibold">
            Not Found
          </div>
        )}

        {!loading && !error && <Results characters={characters} />}
      </div>
    );
  }
}

export default Home;
