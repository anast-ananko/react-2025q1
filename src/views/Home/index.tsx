import { FC, useEffect, useRef, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import CardList from '../../components/CardList';
import Spinner from '../../components/Spinner';
import Paginator from '../../components/Paginator';
import Search from '../../components/Search';
import Popup from '../../components/Popup';
import { updateSearchParams } from '../../utils/updateSearchParams';
import { useGetAllCharactersQuery } from '../../store/services/rickandmortyApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setPage, setQuery } from '../../store/features/uiStateSlice';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { page, query } = useAppSelector((store) => store.uiState);

  const {
    data = { characters: [], pagesNumber: 0, next: null, prev: null },
    isSuccess,
    isLoading,
    isFetching,
    isError,
  } = useGetAllCharactersQuery(
    { page, name: query },
    { refetchOnMountOrArgChange: true }
  );
  const { characters, pagesNumber, next, prev } = data;

  const { id } = useParams<{ id: string }>();
  const [isDetailsVisible, setIsDetailsVisible] = useState(!!id);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>(query);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', '1');
    updatedSearchParams.set('query', searchQuery.trim());

    if (!searchQuery.trim()) {
      updatedSearchParams.delete('query');
    }

    setSearchParams(updatedSearchParams);

    dispatch(setQuery(searchQuery));
    dispatch(setPage(1));
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
      <div className="w-2/3 px-4 py-8 mb-10">
        <Search
          searchQuery={searchQuery}
          onChangeQuery={handleInput}
          onSubmit={handleSubmit}
        />

        {isError && <div>Error</div>}

        {characters.length > 0 && (
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

      {isDetailsVisible && (
        <div ref={detailsRef} className="sm:w-[100px] md:w-1/2 lg:w-1/3">
          <Outlet />
        </div>
      )}

      <Popup />
    </div>
  );
};

export default Home;
