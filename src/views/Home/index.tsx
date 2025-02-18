import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { CardList, Header, Paginator, Popup, Spinner } from '../../components';
import { useGetAllCharactersQuery } from '../../store/services/rickandmortyApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setCurrentCards } from '../../store/features/currentCardsSlice';

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

  useEffect(() => {
    dispatch(setCurrentCards(characters));
  }, [characters, dispatch]);

  return (
    <div className="flex">
      <div className="w-2/3 px-4 py-8 mb-10">
        <Header />

        <>
          {error && 'status' in error && error.status === 404 && (
            <div className="mt-16 text-xl dark:text-white font-bold text-center">
              Not found
            </div>
          )}
          {error && !('status' in error) && (
            <div className="mt-16 text-xl dark:text-white font-semibold text-center">
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

        {isSuccess && !isLoading && !isFetching && <CardList />}
      </div>

      <div className="sm:w-[100px] md:w-1/2 lg:w-1/3">
        <Outlet />
      </div>

      <Popup />
    </div>
  );
};

export default Home;
