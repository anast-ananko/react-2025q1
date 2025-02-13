import { FC } from 'react';

interface SearchProps {
  searchQuery: string;
  onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Search: FC<SearchProps> = ({ searchQuery, onChangeQuery, onSubmit }) => {
  return (
    <div className="bg-white px-4 pb-4 rounded-lg max-w-sm mx-auto">
      <form onSubmit={onSubmit} className="flex space-x-2">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={onChangeQuery}
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 text-xl rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-green-400 text-sm placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-green-600 text-white text-xl rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-green-600 text-sm font-semibold transition duration-300 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
