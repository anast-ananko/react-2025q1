import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const STORAGE_KEY = 'searchQuery';

export const useSearchQuery = (): [
  string,
  string,
  (query: string) => void,
  () => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const storedQuery = localStorage.getItem(STORAGE_KEY) || '';
  const query = searchParams.get('query') || storedQuery;

  const [inputValue, setInputValue] = useState(query);

  const updateInput = (newValue: string): void => {
    setInputValue(newValue);
  };

  const setQueryOnSubmit = (): void => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const newParams: Record<string, string> = { ...currentParams, page: '1' };

    if (inputValue.trim()) {
      newParams.query = inputValue.trim();
      localStorage.setItem(STORAGE_KEY, inputValue.trim());
    } else {
      delete newParams.query;
      localStorage.removeItem(STORAGE_KEY);
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  return [query, inputValue, updateInput, setQueryOnSubmit];
};
