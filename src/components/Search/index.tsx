import { FC } from 'react';

interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Search: FC<SearchProps> = ({ query, onQueryChange, onSubmit }) => {
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onQueryChange(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="flex space-x-2">
      <div className="flex-1">
        <input
          type="text"
          value={query}
          onChange={handleQuery}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-green-400 text-sm placeholder-gray-400"
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-green-600 text-sm font-semibold transition duration-300 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
