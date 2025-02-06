import { ApiResponse, Character } from '../types/apiTypes';

export async function fetchCharacters(
  query: string = '',
  page: number = 1
): Promise<Character[]> {
  const url = query
    ? `https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`
    : `https://rickandmortyapi.com/api/character?page=${page}`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    return data.results;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('An unknown error occurred while fetching characters');
  }
}
