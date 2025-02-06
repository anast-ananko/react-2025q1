import { useEffect, useState } from 'react';

const STORAGE_KEY = 'searchQuery';

export const useLocalStorage = (
  defaultValue = ''
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, query);
  }, [query]);

  return [query, setQuery];
};
