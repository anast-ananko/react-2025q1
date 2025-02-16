import { FC } from 'react';

import { Search } from '../../components';
import { useTheme } from '../../context/useTheme';

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="px-4 pb-4 rounded-lg max-w-lg mx-auto flex items-center justify-between space-x-4">
      <Search />

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
