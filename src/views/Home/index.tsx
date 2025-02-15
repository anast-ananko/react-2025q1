import { FC, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import CardList from '../../components/CardList';
import Spinner from '../../components/Spinner';
import Paginator from '../../components/Paginator';
import Search from '../../components/Search';
import Popup from '../../components/Popup';
import { useGetAllCharactersQuery } from '../../store/services/rickandmortyApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setPage, setQuery } from '../../store/features/uiStateSlice';
import { resetSelected } from '../../store/features/selectedItemsSlice';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { page, query } = useAppSelector((store) => store.uiState);
  const {
    data = { characters: [], pagesNumber: 0, next: null, prev: null },
    error,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetAllCharactersQuery({ page, name: query });
  const { characters, pagesNumber, next, prev } = data;

  const [searchQuery, setSearchQuery] = useState<string>(query);

  const setSearchParams = useSearchParams()[1];

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', '1');

      if (searchQuery.trim()) {
        params.set('query', searchQuery.trim());
      } else {
        params.delete('query');
      }

      return params;
    });

    dispatch(setQuery(searchQuery));
    dispatch(setPage(1));
    dispatch(resetSelected());
  };

  return (
    <div className="flex">
      <div className="w-2/3 px-4 py-8 mb-10">
        <Search
          searchQuery={searchQuery}
          onChangeQuery={handleInput}
          onSubmit={handleSubmit}
        />

        <>
          {error && 'status' in error && error.status === 404 && (
            <div className="mt-16 text-xl font-bold text-center">Not found</div>
          )}
          {error && !('status' in error) && (
            <div className="mt-16 text-xl font-semibold text-center">
              {error?.message}
            </div>
          )}
        </>

        {!error && !isLoading && !isFetching && (
          <Paginator
            pagesNumber={pagesNumber}
            hasNext={!!next}
            hasPrev={!!prev}
          />
        )}

        {(isLoading || isFetching) && (
          <div>
            <Spinner />
          </div>
        )}

        {isSuccess && !isLoading && !isFetching && (
          <CardList characters={characters} />
        )}
      </div>

      <div className="sm:w-[100px] md:w-1/2 lg:w-1/3">
        <Outlet />
      </div>

      <Popup />
    </div>
  );
};

export default Home;
