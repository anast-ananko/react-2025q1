import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { setPage, setQuery } from '../../store/features/uiStateSlice';
import { resetSelected } from '../../store/features/selectedCardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((store) => store.uiState);

  const [searchQuery, setSearchQuery] = useState<string>(query);

  const setSearchParams = useSearchParams()[1];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="flex space-x-2">
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={onChangeQuery}
          placeholder="Search..."
          className="dark:text-white w-full p-2 border border-gray-300 text-xl rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-green-400 text-sm placeholder-gray-400"
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-green-600 text-white text-xl rounded-lg shadow-md dark:text-gray-800 hover:bg-green-800 focus:outline-none focus:ring-green-600 text-sm font-semibold transition duration-300 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
