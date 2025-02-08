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
    setSearchParams({ query: inputValue });
    localStorage.setItem(STORAGE_KEY, inputValue);
  };

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  return [query, inputValue, updateInput, setQueryOnSubmit];
};
