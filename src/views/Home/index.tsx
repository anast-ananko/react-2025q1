import { FC, useEffect, useState } from 'react';

import { Character } from '../../types/apiTypes';
import Header from '../../components/Header';
import CardList from '../../components/CardList';
import { fetchCharacters } from '../../services/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Home: FC = () => {
  const [query, setQuery] = useLocalStorage('');

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(query);
  }, []);

  const fetchData = async (query: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const characters = await fetchCharacters(query);

      if (characters.length === 0) {
        setCharacters([]);
      }

      setCharacters(characters);
      setLoading(false);
    } catch (error) {
      setCharacters([]);
      setLoading(false);
      setError(
        error instanceof Error ? error.message : 'Something went wrong.'
      );
    }
  };

  const handleQueryChange = (query: string): void => {
    setQuery(query);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    fetchData(trimmedQuery);
  };

  return (
    <div className="px-4 py-8">
      <Header
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={handleSubmit}
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

      {!loading && !error && <CardList characters={characters} />}
    </div>
  );
};

export default Home;
