import { FC } from 'react';

import { useTheme } from '../../context/useTheme';
import Search from '../Search';

interface SearchProps {
  searchQuery: string;
  onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Header: FC<SearchProps> = ({ searchQuery, onChangeQuery, onSubmit }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 px-4 pb-4 rounded-lg max-w-lg mx-auto flex items-center justify-between space-x-4">
      <Search
        searchQuery={searchQuery}
        onChangeQuery={onChangeQuery}
        onSubmit={onSubmit}
      />

      <button
        onClick={toggleTheme}
        className="py-2 px-4 text-xl rounded-lg transition-colors bg-blue-500 dark:bg-yellow-400 cursor-pointer"
      >
        {theme === 'light' ? '🌙 Dark' : '🌞 Light'}
      </button>
    </div>
  );
};

export default Header;
