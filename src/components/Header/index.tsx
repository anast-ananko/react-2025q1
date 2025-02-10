import { FC, useEffect, useState } from 'react';

import Search from '../Search';

interface HeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Header: FC<HeaderProps> = ({ query, onQueryChange, onSubmit }) => {
  const [throwError, setThrowError] = useState<boolean>(false);

  const toggleError = (): void => {
    setThrowError(true);
  };

  useEffect(() => {
    if (throwError) {
      throw new Error('This is a test error!');
    }
  }, [throwError]);

  return (
    <div className="bg-white px-4 pb-4 rounded-lg max-w-sm mx-auto">
      <Search query={query} onQueryChange={onQueryChange} onSubmit={onSubmit} />

      <div className="flex justify-center mt-4">
        <button
          onClick={toggleError}
          className="py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-red-600 text-sm font-semibold transition duration-300 cursor-pointer"
        >
          Throw Error
        </button>
      </div>
    </div>
  );
};

export default Header;
