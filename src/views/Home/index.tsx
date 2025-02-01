import { Component } from 'react';

import apiService from '../../services/api';
import { Character } from '../../types/apiTypes';
import TopControls from '../../components/TopControls';

import styles from './Home.module.scss';
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

  componentWillUnmount = () => {
    localStorage.setItem('searchQuery', this.state.query);
  };

  fetchCharacters = async (query: string): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const characters = await apiService.fetchCharacters(query);
      this.setState({ characters, loading: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Something went wrong.',
        loading: false,
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
        <div className={styles.home}>Home</div>
        {loading && <div>Loading...</div>}
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : characters.length === 0 && !loading ? (
          <p>No characters found</p>
        ) : (
          <Results characters={characters} />
        )}
      </>
    );
  }
}

export default Home;
