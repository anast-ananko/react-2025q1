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

class Home extends Component {
  state: HomeState = {
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
    localStorage.setItem('searchQuery', query);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.fetchCharacters(this.state.query);
  };

  render() {
    const { query, characters, loading, error } = this.state;

    return (
      <>
        <TopControls
          query={query}
          onQueryChange={this.handleQueryChange}
          onSubmit={this.handleSubmit}
        />

        {loading && <div>Loading...</div>}

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
      </>
    );
  }
}

export default Home;
