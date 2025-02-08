import { FC, Suspense } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';

import { useSearchQuery } from '../../hooks/useLocalStorage';
import Header from '../../components/Header';
import CardList from '../../components/CardList';
import Spinner from '../../components/Spinner';
import { CharactersLoader } from '../../loaders/charactersLoader';

const Home: FC = () => {
  const { characters } = useLoaderData() as CharactersLoader;
  const [query, inputValue, setInputValue, setQueryOnSubmit] = useSearchQuery();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const trimmedQuery = inputValue.trim();
    if (trimmedQuery === query) return;

    setQueryOnSubmit();
    navigate(`/?query=${trimmedQuery}`);
  };

  return (
    <div className="px-4 py-8">
      <Header
        query={inputValue}
        onQueryChange={setInputValue}
        onSubmit={handleSubmit}
      />
      <Suspense fallback={<Spinner />}>
        <Await resolve={characters}>
          {(characters) =>
            characters.length === 0 ? (
              <div className="px-4 py-8">
                <div className="flex items-center justify-center h-64 text-gray-500 text-lg font-semibold">
                  Not Found
                </div>
              </div>
            ) : (
              <CardList characters={characters} />
            )
          }
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;
