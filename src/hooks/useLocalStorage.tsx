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
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', '1');
    updatedSearchParams.set('query', inputValue.trim());

    if (inputValue.trim()) {
      localStorage.setItem(STORAGE_KEY, inputValue.trim());
    } else {
      updatedSearchParams.delete('query');
      localStorage.removeItem(STORAGE_KEY);
    }

    setSearchParams(updatedSearchParams);
  };

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  return [query, inputValue, updateInput, setQueryOnSubmit];
};
