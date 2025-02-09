import { FC, Suspense, useEffect, useRef, useState } from 'react';
import {
  Await,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { useSearchQuery } from '../../hooks/useLocalStorage';
import Header from '../../components/Header';
import CardList from '../../components/CardList';
import Spinner from '../../components/Spinner';
import Paginator from '../../components/Paginator';
import { CharactersLoader } from '../../loaders/charactersLoader';
import { updateSearchParams } from '../../utils/updateSearchParams';

const Home: FC = () => {
  const { data } = useLoaderData() as CharactersLoader;
  const [query, inputValue, setInputValue, setQueryOnSubmit] = useSearchQuery();
  const { id } = useParams<{ id: string }>();
  const [isDetailsVisible, setIsDetailsVisible] = useState(!!id);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const trimmedQuery = inputValue.trim();
    if (trimmedQuery === query) return;

    setQueryOnSubmit();
  };

  useEffect(() => {
    if (id) {
      setIsDetailsVisible(true);
    }
  }, [id]);

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    const target = event.target as HTMLElement;

    if (
      detailsRef.current &&
      target &&
      !detailsRef.current.contains(target) &&
      !target.closest('.card')
    ) {
      setIsDetailsVisible(false);
      updateSearchParams(searchParams, navigate);
    }
  };

  return (
    <div className="flex" onClick={handleClickOutside}>
      <div className="w-2/3 px-4 py-8">
        <Header
          query={inputValue}
          onQueryChange={setInputValue}
          onSubmit={handleSubmit}
        />
        <Suspense fallback={<Spinner />}>
          <Await resolve={data}>
            {(resolvedData) => {
              const { results, info } = resolvedData;
              return results.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-gray-500 text-lg font-semibold">
                  Not Found
                </div>
              ) : (
                <>
                  <CardList characters={results} />
                  <Paginator hasNext={!!info?.next} hasPrev={!!info?.prev} />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>

      {isDetailsVisible && (
        <div ref={detailsRef} className="w-1/3 border-l">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Home;
